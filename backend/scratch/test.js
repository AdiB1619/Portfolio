const API = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- STARTING TESTS ---');

  const report = {
    testsExecuted: [],
    testsPassed: [],
    testsFailed: [],
    criticalBugs: [],
    securityBugs: [],
    apiContractMismatches: [],
    responseInconsistencies: [],
    authIssues: [],
    hiddenRegressions: []
  };

  function logTest(name, passed, details = '') {
    report.testsExecuted.push(name);
    if (passed) {
      report.testsPassed.push(name);
      console.log(`✅ PASS: ${name}`);
    } else {
      report.testsFailed.push(name);
      console.log(`❌ FAIL: ${name} - ${details}`);
    }
  }

  // 1. Health Endpoint
  try {
    const res = await fetch(`${API}/health`);
    const json = await res.json();
    const passed = res.status === 200 && json.success === true && json.message === 'API running' && json.database && json.timestamp;
    if (!passed) report.responseInconsistencies.push('Health endpoint missing fields or wrong status');
    logTest('Health Endpoint', passed, JSON.stringify(json));
  } catch(e) { logTest('Health Endpoint', false, e.message); }

  // 2. Public Routes
  try {
    const res = await fetch(`${API}/projects`);
    const json = await res.json();
    const passed = res.status === 200 && json.success === true && Array.isArray(json.data.projects);
    if (!passed) report.responseInconsistencies.push('Projects structure invalid');
    logTest('Public Projects List', passed);
  } catch(e) { logTest('Public Projects List', false, e.message); }

  try {
    const res = await fetch(`${API}/projects?featured=true`);
    const json = await res.json();
    logTest('Public Projects Filter', res.status === 200);
  } catch(e) { logTest('Public Projects Filter', false, e.message); }

  try {
    const res = await fetch(`${API}/skills`);
    const json = await res.json();
    logTest('Public Skills', res.status === 200 && Array.isArray(json.data.skills));
  } catch(e) { logTest('Public Skills', false, e.message); }

  try {
    const res = await fetch(`${API}/experience`);
    const json = await res.json();
    const passed = res.status === 200 && json.success === true;
    if (!passed) report.responseInconsistencies.push('Experience structure invalid');
    logTest('Public Experience', passed);
  } catch(e) { logTest('Public Experience', false, e.message); }

  // 3. Contact Form
  try {
    const res = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const json = await res.json();
    const passed = res.status === 400 && json.success === false && Array.isArray(json.errors);
    if (!passed) report.apiContractMismatches.push('Contact form validation missing or wrong structure');
    logTest('Contact Validation 400', passed, JSON.stringify(json));
  } catch(e) { logTest('Contact Validation 400', false, e.message); }

  try {
    const res = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', email: 'alice@example.com', subject: 'Test', message: 'Hello this is a test' })
    });
    const json = await res.json();
    logTest('Contact Success 201', res.status === 201 && json.success === true);
  } catch(e) { logTest('Contact Success 201', false, e.message); }

  // 4. Rate Limiting
  let rlFail = false;
  for(let i=0; i<6; i++) {
    const res = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'a@a.com', subject: 'B', message: '0123456789' })
    });
    if (i === 5) {
      const json = await res.json();
      const passed = res.status === 429 && json.success === false && json.message === "Too many requests. Please try again later.";
      if (!passed) report.apiContractMismatches.push(`Rate limit failed: ${JSON.stringify(json)}`);
      logTest('Rate Limiting', passed, JSON.stringify(json));
    }
  }

  // 5. Unauthorized
  try {
    const res = await fetch(`${API}/messages`);
    const json = await res.json();
    const passed = res.status === 401 && json.success === false;
    if (!passed) report.securityBugs.push('Protected route accessible without auth');
    logTest('Unauthorized Route 401', passed);
  } catch(e) { logTest('Unauthorized Route 401', false, e.message); }

  // 6. Login
  let cookie = '';
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Aditya@0771' })
    });
    cookie = res.headers.get('set-cookie');
    const json = await res.json();
    const passed = res.status === 200 && json.success === true && cookie && cookie.includes('token=');
    if (!passed) report.authIssues.push(`Login failed: ${JSON.stringify(json)} (Status: ${res.status}) (Cookie: ${cookie})`);
    logTest('Login Success', passed, JSON.stringify(json));
  } catch(e) { logTest('Login Success', false, e.message); }

  // 7. Protected Route
  try {
    const res = await fetch(`${API}/auth/me`, {
      headers: { cookie }
    });
    const json = await res.json();
    const passed = res.status === 200 && json.success === true && json.data.email === 'admin@example.com';
    if (!passed) report.authIssues.push('Auth Me endpoint failed with valid cookie');
    logTest('Auth Me Success', passed);
  } catch(e) { logTest('Auth Me Success', false, e.message); }

  try {
    const res = await fetch(`${API}/messages`, {
      headers: { cookie }
    });
    const json = await res.json();
    logTest('Protected Messages Access', res.status === 200 && json.success === true);
  } catch(e) { logTest('Protected Messages Access', false, e.message); }

  // 8. Logout
  try {
    const res = await fetch(`${API}/auth/logout`, {
      method: 'POST',
      headers: { cookie }
    });
    const newCookie = res.headers.get('set-cookie');
    logTest('Logout Success', res.status === 200);

    const checkRes = await fetch(`${API}/auth/me`, {
      headers: { cookie: newCookie }
    });
    const checkPassed = checkRes.status === 401;
    if (!checkPassed) report.criticalBugs.push('Still logged in after logout');
    logTest('Verify Logged Out 401', checkPassed);
  } catch(e) { logTest('Logout Success', false, e.message); }

  // 9. Invalid JWT
  try {
    const res = await fetch(`${API}/auth/me`, {
      headers: { cookie: 'token=invalidjwt123' }
    });
    const passed = res.status === 401;
    if (!passed) report.securityBugs.push('Invalid JWT accepted');
    logTest('Invalid JWT 401', passed);
  } catch(e) { logTest('Invalid JWT 401', false, e.message); }

  // 10. Error Handler
  try {
    const res = await fetch(`${API}/projects/123`);
    const json = await res.json();
    const passed = (res.status === 400 || res.status === 404) && json.success === false && !json.stack;
    if (!passed) report.criticalBugs.push('Error handler exposes stack or fails on CastError');
    logTest('Error Handler CastError', passed);
  } catch(e) { logTest('Error Handler CastError', false, e.message); }

  console.log('--- REPORT JSON ---');
  console.log(JSON.stringify(report, null, 2));
}

runTests();
