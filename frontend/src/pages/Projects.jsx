import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Code2, Search, Check, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { toast } from 'sonner';
import api from '../api/axios';

const initialForm = {
  title: '',
  shortDescription: '',
  longDescription: '',
  techStack: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  order: 0
};

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
  // Form state
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data.projects || []);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setForm({
        ...project,
        techStack: project.techStack.join(', ')
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingId) {
        await api.patch(`/projects/${editingId}`, payload);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created successfully');
      }
      fetchProjects();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setSaving(true);
    try {
      await api.delete(`/projects/${projectToDelete}`);
      toast.success('Project deleted successfully');
      fetchProjects();
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error('Failed to delete project');
    } finally {
      setSaving(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-muted mt-1">Manage your portfolio projects and case studies.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="overflow-hidden border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><SkeletonLoader className="h-10 w-48" /></TableCell>
                  <TableCell><SkeletonLoader className="h-6 w-32" /></TableCell>
                  <TableCell><SkeletonLoader className="h-6 w-16" /></TableCell>
                  <TableCell className="text-right"><SkeletonLoader className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt="" className="h-10 w-10 rounded-md object-cover border border-border" />
                      )}
                      <div>
                        <div className="text-white">{project.title}</div>
                        <div className="text-xs text-muted max-w-xs truncate">{project.shortDescription}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map(t => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-[10px]">+{project.techStack.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="h-9 w-9 flex items-center justify-center rounded-full text-muted hover:text-white hover:bg-elevated-surface transition-all">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="h-9 w-9 flex items-center justify-center rounded-full text-muted hover:text-white hover:bg-elevated-surface transition-all">
                          <Code2 size={18} />
                        </a>
                      )}
                      <button onClick={() => handleOpenModal(project)} className="h-9 w-9 flex items-center justify-center rounded-full text-muted hover:text-white hover:bg-elevated-surface transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => { setProjectToDelete(project._id); setIsConfirmOpen(true); }}
                        className="h-9 w-9 flex items-center justify-center rounded-full text-muted hover:text-danger hover:bg-danger/10 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Project" : "New Project"}
        description={editingId ? "Update your project details." : "Add a new project to your portfolio."}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Title</label>
              <Input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Image URL</label>
              <Input 
                value={form.imageUrl} 
                onChange={e => setForm({...form, imageUrl: e.target.value})} 
                placeholder="https://"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Short Description</label>
            <Input 
              value={form.shortDescription} 
              onChange={e => setForm({...form, shortDescription: e.target.value})} 
              maxLength={150}
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Long Description (Markdown)</label>
            <Textarea 
              value={form.longDescription} 
              onChange={e => setForm({...form, longDescription: e.target.value})} 
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Tech Stack (comma separated)</label>
            <Input 
              value={form.techStack} 
              onChange={e => setForm({...form, techStack: e.target.value})} 
              placeholder="React, Node.js, MongoDB"
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Live URL</label>
              <Input 
                value={form.liveUrl} 
                onChange={e => setForm({...form, liveUrl: e.target.value})} 
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">GitHub URL</label>
              <Input 
                value={form.githubUrl} 
                onChange={e => setForm({...form, githubUrl: e.target.value})} 
                placeholder="https://"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setForm({...form, featured: !form.featured})}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${form.featured ? 'bg-primary' : 'bg-surface border border-border'}`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${form.featured ? 'translate-x-2' : '-translate-x-2'}`} />
            </button>
            <span className="text-sm font-medium text-white">Featured Project</span>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={saving}>Save Project</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        isLoading={saving}
      />
    </motion.div>
  );
}
