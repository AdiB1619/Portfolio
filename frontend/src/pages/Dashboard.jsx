import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageLoader } from '../components/ui/Loader';
import { FolderKanban, MessageSquare, Wrench, Briefcase, Plus } from 'lucide-react';
import api from '../api/axios';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, skillRes, expRes, msgRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/messages') // assuming messages return array, we can count unread
        ]);

        const totalProjects = projRes.data.data.count || projRes.data.data.projects?.length || 0;
        const totalSkills = skillRes.data.data.count || skillRes.data.data.skills?.length || 0;
        const totalExp = expRes.data.data.count || expRes.data.data.experience?.length || 0;
        const unreadMessages = (msgRes.data.data.messages || []).filter(m => m.status === 'unread' || m.read === false).length;

        setStats({
          projects: totalProjects,
          skills: totalSkills,
          experience: totalExp,
          unread: unreadMessages,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <PageLoader />;

  const statCards = [
    { title: 'Total Projects', value: stats?.projects, subtitle: '+2 added recently', icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Total Skills', value: stats?.skills, subtitle: 'Across 4 categories', icon: Wrench, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Experience', value: stats?.experience, subtitle: 'Updated this month', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Unread Messages', value: stats?.unread, subtitle: 'Requires attention', icon: MessageSquare, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto space-y-10"
    >
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="text-muted mt-2 text-sm">Overview of your portfolio and inbox.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <CardTitle className="text-xs font-semibold text-muted uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-[10px] border ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-5xl font-bold text-white tracking-tighter">{stat.value ?? '-'}</div>
                <p className="text-[13px] text-muted mt-3 font-medium">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <Card 
            className="cursor-pointer group hover:bg-hover-surface/50"
            onClick={() => navigate('/admin/projects')}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Plus size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Add Project</h3>
                <p className="text-sm text-muted">Create a new portfolio piece</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer group hover:bg-hover-surface/50"
            onClick={() => navigate('/admin/messages')}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500 group-hover:bg-rose-500/20 transition-colors">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">View Messages</h3>
                <p className="text-sm text-muted">Check your recent inquiries</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer group hover:bg-hover-surface/50"
            onClick={() => window.open('/', '_blank')}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Open Portfolio</h3>
                <p className="text-sm text-muted">View live site</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer group hover:bg-hover-surface/50"
            onClick={() => {
              // Note: actual logout would ideally trigger AuthContext logout.
              // For now, we'll route to login, assuming interceptors/layout catch it,
              // or the user uses the sidebar logout.
              // Let's redirect to login which clears auth context effectively in our setup if we used context.
              // Better to just dispatch a custom event or navigate.
              api.post('/auth/logout').then(() => window.location.href = '/admin/login');
            }}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-lg bg-zinc-500/10 text-zinc-400 group-hover:bg-zinc-500/20 transition-colors">
                <Wrench size={20} />
              </div>
              <div>
                <h3 className="font-medium text-white">Logout</h3>
                <p className="text-sm text-muted">End your session</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
