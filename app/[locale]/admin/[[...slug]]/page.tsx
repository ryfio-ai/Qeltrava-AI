// app/[locale]/admin/[[...slug]]/page.tsx
// Master Workspace Administration Dashboard (Qeltrava OS v4.0)

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Users, BookOpen, Award, Cpu, 
  FolderOpen, LineChart, Settings, LogOut, Search, Bell,
  Plus, Edit, Trash, Download, Upload, Activity, Check, 
  AlertCircle, Calendar, DollarSign, Layers, Mail, FileText, CheckSquare
} from 'lucide-react';

// Design System Imports
import { 
  Button, Card, CardHeader, CardBody, Badge, Input, 
  Textarea, Select, Spinner, Alert, Tabs 
} from '@/design-system';

// Server Actions
import {
  getJobs, createJob, updateJob, deleteJob,
  getApplicants, updateApplicant,
  getBlogs, createBlog, updateBlog, deleteBlog,
  getCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy,
  getProducts, createProduct, updateProduct, deleteProduct,
  getMediaFiles, uploadMediaServer, deleteMediaFile,
  getSystemSettings, updateSystemSettings,
  getAuditLogs,
  getCrmLeads, createCrmLead, updateCrmLead,
  getClientPortalAccounts, createClientPortalAccount, updateClientPortalAccount,
  getBackupExport, restoreBackupImport,
  getNewsletterSubscribers,
  getContactMessages, updateContactMessage
} from '@/platform/shared/actions';

import { PlatformRole, Resource, Action, checkPermission } from '@/platform/auth';

export default function AdminWorkspacePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string[] | undefined;
  const currentTab = slug ? slug[0] : 'dashboard';
  const searchParams = useSearchParams();

  // Core State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string>('Viewer');
  const [userEmail, setUserEmail] = useState<string>('');
  
  // Data State
  const [jobs, setJobs] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [crmLeads, setCrmLeads] = useState<any[]>([]);
  const [clientAccounts, setClientAccounts] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeForm, setActiveForm] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New candidate Frontend Developer Intern application received.', read: false },
    { id: 2, text: 'New lead "PSG Technologies" added to sales pipeline.', read: false },
    { id: 3, text: 'Blog published successfully: AI-Native Architecture.', read: true }
  ]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [widgetOrder, setWidgetOrder] = useState<string[]>([
    'applicants', 'crm', 'blogs', 'analytics'
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Resume Viewer UI zoom level state
  const [zoomLevel, setZoomLevel] = useState(100);

  // Dynamic CMS fields
  const [formFields, setFormFields] = useState<any>({
    title: '', slug: '', department: 'Engineering', experience: '', employment_type: 'Full-Time',
    location: '', salary: '', open_positions: 1, description: '', responsibilities: '', requirements: '',
    benefits: '', status: 'Draft', working_model: 'Remote', tech_stack: ''
  });

  // Verify Session on mount
  useEffect(() => {
    if (isAuthenticated !== null) return;
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/auth', { method: 'POST', body: JSON.stringify({ check: true }) });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setIsAuthenticated(true);
            setUserRole(data.user.role || 'Super Admin');
            setUserEmail(data.user.email || 'admin@qeltrava.ai');
            return;
          }
        }
        setIsAuthenticated(false);
        if (currentTab !== 'login') {
          router.push('/admin/login');
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkSession();
  }, [currentTab, router, isAuthenticated]);

  // Load active tab data
  useEffect(() => {
    if (isAuthenticated) {
      loadTabData();
    }
  }, [isAuthenticated, currentTab]);

  // Handle URL edit/action search parameters for direct deep-linking from careers portal
  useEffect(() => {
    if (isAuthenticated && searchParams && jobs.length > 0) {
      const editId = searchParams.get('edit');
      const action = searchParams.get('action');
      if (editId) {
        const matched = jobs.find(j => j.id === editId || j.slug === editId);
        if (matched) {
          setSelectedItem(matched);
          setFormFields({
            ...matched,
            responsibilities: matched.responsibilities?.join('\n') || '',
            requirements: matched.requirements?.join('\n') || '',
            benefits: matched.benefits?.join('\n') || '',
            tech_stack: matched.tech_stack?.join(', ') || ''
          });
          setActiveForm('edit');
        }
      } else if (action === 'create') {
        setSelectedItem(null);
        setFormFields({
          title: '', slug: '', department: 'Engineering', experience: '', employment_type: 'Full-Time',
          location: '', salary: '', open_positions: 1, description: '', responsibilities: '', requirements: '',
          benefits: '', status: 'Draft', working_model: 'Remote', tech_stack: ''
        });
        setActiveForm('create');
      }
    }
  }, [isAuthenticated, searchParams, jobs]);

  const loadTabData = async () => {
    setLoading(true);
    try {
      if (currentTab === 'dashboard') {
        const [j, a, b, c, msg] = await Promise.all([
          getJobs(), getApplicants(), getBlogs(), getCrmLeads(), getContactMessages()
        ]);
        setJobs(j);
        setApplicants(a);
        setBlogs(b);
        setCrmLeads(c);
        setContactMessages(msg);
      } else if (currentTab === 'jobs') {
        setJobs(await getJobs());
      } else if (currentTab === 'applicants') {
        setApplicants(await getApplicants());
        setJobs(await getJobs()); // for linking
      } else if (currentTab === 'blogs') {
        setBlogs(await getBlogs());
      } else if (currentTab === 'case-studies') {
        setCaseStudies(await getCaseStudies());
      } else if (currentTab === 'products') {
        setProducts(await getProducts());
      } else if (currentTab === 'media') {
        setMedia(await getMediaFiles());
      } else if (currentTab === 'crm') {
        setCrmLeads(await getCrmLeads());
      } else if (currentTab === 'clients') {
        setClientAccounts(await getClientPortalAccounts());
      } else if (currentTab === 'settings') {
        setSettings(await getSystemSettings());
        setAuditLogs(await getAuditLogs());
        setSubscribers(await getNewsletterSubscribers());
        setContactMessages(await getContactMessages());
      }
    } catch (err) {
      console.error('Error fetching tab data:', err);
    }
    setLoading(false);
  };

  // Auth Functions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setUserRole(data.user.role);
        setUserEmail(data.user.email);
        localStorage.setItem('qeltrava_user_meta', JSON.stringify(data.user));
        
        // Check redirect query
        const urlParams = new URLSearchParams(window.location.search);
        const redir = urlParams.get('redirect') || '/admin';
        router.push(redir);
      } else {
        setErrorMsg(data.message || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg('Network error occurred.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    localStorage.removeItem('qeltrava_user_meta');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // Permission check helper
  const hasAccess = (resource: Resource, action: Action) => {
    return checkPermission(userRole, resource, action);
  };

  // Drag and Drop reorder mock
  const moveWidget = (direction: 'up' | 'down', index: number) => {
    const nextOrder = [...widgetOrder];
    if (direction === 'up' && index > 0) {
      const temp = nextOrder[index];
      nextOrder[index] = nextOrder[index - 1];
      nextOrder[index - 1] = temp;
    } else if (direction === 'down' && index < nextOrder.length - 1) {
      const temp = nextOrder[index];
      nextOrder[index] = nextOrder[index + 1];
      nextOrder[index + 1] = temp;
    }
    setWidgetOrder(nextOrder);
  };

  // Dynamic Jobs CRUD Actions
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formFields,
        responsibilities: formFields.responsibilities.split('\n').filter((r: string) => r.trim() !== ''),
        requirements: formFields.requirements.split('\n').filter((r: string) => r.trim() !== ''),
        benefits: formFields.benefits.split('\n').filter((b: string) => b.trim() !== ''),
        hiring_process: [
          '1. Online Assessment',
          '2. System Architectural Review',
          '3. Final Founding Sync'
        ],
        tech_stack: formFields.tech_stack.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
      };

      if (activeForm === 'create') {
        await createJob(jobData);
      } else if (activeForm === 'edit' && selectedItem) {
        await updateJob(selectedItem.id, jobData);
      }
      setActiveForm(null);
      setSelectedItem(null);
      loadTabData();
    } catch (err: any) {
      alert(err.message || 'Error saving job.');
    }
  };

  // Media Library Upload Action
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setLoading(true);
      try {
        await uploadMediaServer(file.name, file.type, file.size, base64, '/');
        loadTabData();
      } catch (err) {
        alert('File upload failed.');
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Settings customizers
  const handleSaveSettings = async () => {
    try {
      await updateSystemSettings(settings);
      alert('Settings updated successfully.');
    } catch (err) {
      alert('Failed to save settings.');
    }
  };

  // CSV Export helper
  const handleExportBackup = async () => {
    try {
      const backup = await getBackupExport();
      const blob = new Blob([backup], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qeltrava-db-backup-${Date.now()}.json`;
      a.click();
    } catch (err) {
      alert('Backup failed.');
    }
  };

  // Render Loader
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center text-white">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4 border-[var(--color-accent)]" />
          <p className="text-sm font-mono opacity-80">Loading Qeltrava OS...</p>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN RENDER
  if (currentTab === 'login' || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,117,182,0.1),transparent_40%)] pointer-events-none" />
        
        <Card className="w-full max-w-md bg-[#111827]/85 border-[#1f2937] backdrop-blur-md shadow-2xl p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--color-accent)]/20 font-bold text-2xl">
              Q
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Qeltrava OS</h1>
            <p className="text-xs text-white/60 mt-1 font-mono">Enterprise CMS & Admin Platform</p>
          </div>

          {errorMsg && (
            <Alert variant="danger" className="mb-6 bg-red-950/40 border-red-900/60 text-red-200">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 font-mono">Email Address</label>
              <Input 
                type="email" 
                required 
                placeholder="admin@qeltrava.ai" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1f2937]/50 border-[#374151] text-white focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 font-mono">Password</label>
              <Input 
                type="password" 
                required 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1f2937]/50 border-[#374151] text-white focus:border-[var(--color-accent)]"
              />
            </div>
            <Button type="submit" loading={loading} className="w-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 h-11 text-sm font-semibold rounded-full mt-8">
              Sign In to Qeltrava OS
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // 2. DASHBOARD SHELL & SIDEBAR
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, resource: 'jobs' as Resource },
    { id: 'jobs', label: 'Jobs CMS', icon: Briefcase, resource: 'jobs' as Resource },
    { id: 'applicants', label: 'Careers ATS', icon: Users, resource: 'applicants' as Resource },
    { id: 'blogs', label: 'Blog CMS', icon: BookOpen, resource: 'blogs' as Resource },
    { id: 'case-studies', label: 'Case Studies', icon: Award, resource: 'caseStudies' as Resource },
    { id: 'products', label: 'Products & Modliq', icon: Cpu, resource: 'products' as Resource },
    { id: 'media', label: 'Media Library', icon: FolderOpen, resource: 'media' as Resource },
    { id: 'crm', label: 'CRM Sales', icon: LineChart, resource: 'crm' as Resource },
    { id: 'clients', label: 'Client Portal', icon: Layers, resource: 'clients' as Resource },
    { id: 'settings', label: 'Settings', icon: Settings, resource: 'settings' as Resource }
  ];

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#111827] text-white border-r border-[#1f2937] flex flex-col justify-between z-20 shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#1f2937] flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 bg-[var(--color-accent)] text-white text-xs flex items-center justify-center rounded-lg font-bold">Q</span>
                <span>Qeltrava OS</span>
              </h2>
              <p className="text-[10px] text-white/50 font-mono mt-0.5">V4.0.0 · Super Admin</p>
            </div>
          </div>
          {/* Menu items */}
          <nav className="p-4 space-y-1">
            {menuItems.map(item => {
              const IconComp = item.icon;
              const active = currentTab === item.id;
              
              // Verify permission
              const hasRead = checkPermission(userRole, item.resource, 'read');
              if (!hasRead && item.id !== 'dashboard') return null;

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(`/admin/${item.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    active 
                      ? 'bg-[var(--color-accent)] text-white shadow-md' 
                      : 'text-white/70 hover:bg-[#1f2937] hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile footer */}
        <div className="p-4 border-t border-[#1f2937] space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center rounded-full uppercase">
              {userEmail.charAt(0)}
            </div>
            <div className="truncate">
              <h4 className="text-xs font-bold text-white truncate">{userEmail}</h4>
              <span className="text-[9px] font-mono text-[var(--color-accent)] uppercase tracking-wider">{userRole}</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* TOP BAR HEADER */}
        <header className="h-16 bg-[#111827] text-white border-b border-[#1f2937] px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold capitalize tracking-tight flex items-center gap-2 text-white">
              {currentTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Global Cmd+K Search trigger */}
            <button 
              onClick={() => setShowSearchModal(true)} 
              className="h-9 px-3 bg-[#1f2937] border border-[#374151] rounded-lg text-xs text-white/50 flex items-center gap-6 hover:border-[var(--color-accent)] transition-all font-mono"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search dashboard...</span>
              </div>
              <span className="bg-[#111827] px-1.5 py-0.5 rounded text-[10px] border border-[#374151]">⌘K</span>
            </button>

            {/* Notification center */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 bg-[#1f2937] hover:bg-[#2e3e57] text-white rounded-lg flex items-center justify-center border border-[#374151] relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#111827] border border-[#1f2937] shadow-xl rounded-xl p-4 space-y-3 z-30">
                  <h3 className="text-xs font-bold text-white border-b border-white/10 pb-2">Recent Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-lg text-xs ${n.read ? 'opacity-60' : 'bg-slate-800'}`}>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Theme switcher */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="text-xs px-2.5 py-1.5 bg-[#1f2937] hover:bg-slate-800 border border-[#374151] rounded-lg transition-colors font-mono"
            >
              {isDarkMode ? '☀ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT BODY */}
        <main className="flex-grow p-8 overflow-y-auto">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <Spinner size="lg" className="border-[var(--color-accent)]" />
            </div>
          ) : (
            <>
              {/* 3. DASHBOARD MAIN SCREEN */}
              {currentTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Top Stats Cards Widget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                      <CardBody className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Candidates</p>
                          <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{applicants.length}</h3>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                      <CardBody className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Open Positions</p>
                          <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{jobs.filter(j => j.status === 'Published').length}</h3>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                      <CardBody className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100">
                          <LineChart className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">CRM Sales Deals</p>
                          <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{crmLeads.length}</h3>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                      <CardBody className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Contact Forms</p>
                          <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{contactMessages.length}</h3>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Reorderable Dashboard Widget Layout */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider font-mono">Workspace Widget Layout</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {widgetOrder.map((wId, idx) => {
                        if (wId === 'applicants') {
                          return (
                            <Card key={wId} className="bg-white border-[var(--color-border-soft)] shadow-sm">
                              <CardHeader className="flex items-center justify-between border-b border-slate-100 py-4 px-6">
                                <h3 className="font-bold text-slate-800 text-sm">Recent Candidates (ATS)</h3>
                                <div className="flex gap-1">
                                  <button onClick={() => moveWidget('up', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▲</button>
                                  <button onClick={() => moveWidget('down', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▼</button>
                                </div>
                              </CardHeader>
                              <CardBody className="p-0">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                      <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Name</th>
                                      <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Job</th>
                                      <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Stage</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {applicants.slice(0, 3).map((app, index) => (
                                      <tr key={index} className="border-b border-slate-50 text-slate-700">
                                        <td className="py-3 px-6 text-xs font-semibold">{app.full_name}</td>
                                        <td className="py-3 px-6 text-xs">{app.experience || 'Internship'}</td>
                                        <td className="py-3 px-6 text-xs">
                                          <Badge className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{app.status}</Badge>
                                        </td>
                                      </tr>
                                    ))}
                                    {applicants.length === 0 && (
                                      <tr>
                                        <td colSpan={3} className="text-center py-6 text-xs text-slate-400">No applicants yet.</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </CardBody>
                            </Card>
                          );
                        }
                        if (wId === 'crm') {
                          return (
                            <Card key={wId} className="bg-white border-[var(--color-border-soft)] shadow-sm">
                              <CardHeader className="flex items-center justify-between border-b border-slate-100 py-4 px-6">
                                <h3 className="font-bold text-slate-800 text-sm">CRM Opportunities Pipeline</h3>
                                <div className="flex gap-1">
                                  <button onClick={() => moveWidget('up', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▲</button>
                                  <button onClick={() => moveWidget('down', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▼</button>
                                </div>
                              </CardHeader>
                              <CardBody className="p-6">
                                <div className="space-y-4">
                                  {crmLeads.slice(0, 3).map((lead, index) => (
                                    <div key={index} className="flex justify-between items-center text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                      <div>
                                        <h4 className="font-bold text-slate-800">{lead.contact_name}</h4>
                                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{lead.company_name || 'Individual'}</span>
                                      </div>
                                      <div className="text-right">
                                        <Badge className="bg-amber-100 text-amber-700">{lead.status}</Badge>
                                        <span className="block font-bold text-slate-800 mt-1 font-mono">${lead.deal_value || 0}</span>
                                      </div>
                                    </div>
                                  ))}
                                  {crmLeads.length === 0 && (
                                    <p className="text-center text-xs text-slate-400 py-4">No active pipeline leads.</p>
                                  )}
                                </div>
                              </CardBody>
                            </Card>
                          );
                        }
                        if (wId === 'blogs') {
                          return (
                            <Card key={wId} className="bg-white border-[var(--color-border-soft)] shadow-sm">
                              <CardHeader className="flex items-center justify-between border-b border-slate-100 py-4 px-6">
                                <h3 className="font-bold text-slate-800 text-sm">Blogs CMS Stats</h3>
                                <div className="flex gap-1">
                                  <button onClick={() => moveWidget('up', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▲</button>
                                  <button onClick={() => moveWidget('down', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▼</button>
                                </div>
                              </CardHeader>
                              <CardBody className="p-6 space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                                  <span className="text-xs text-slate-500 font-semibold">Total Articles</span>
                                  <span className="font-bold text-slate-800 font-mono text-sm">{blogs.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-slate-500 font-semibold">Published</span>
                                  <span className="font-bold text-emerald-600 font-mono text-sm">{blogs.filter(b => b.published).length}</span>
                                </div>
                              </CardBody>
                            </Card>
                          );
                        }
                        if (wId === 'analytics') {
                          return (
                            <Card key={wId} className="bg-white border-[var(--color-border-soft)] shadow-sm">
                              <CardHeader className="flex items-center justify-between border-b border-slate-100 py-4 px-6">
                                <h3 className="font-bold text-slate-800 text-sm">System Health & Telemetry</h3>
                                <div className="flex gap-1">
                                  <button onClick={() => moveWidget('up', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▲</button>
                                  <button onClick={() => moveWidget('down', idx)} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded">▼</button>
                                </div>
                              </CardHeader>
                              <CardBody className="p-6 space-y-4 text-xs font-mono">
                                <div className="flex justify-between items-center text-slate-600">
                                  <span>Database Client:</span>
                                  <span className="text-emerald-600 font-bold">Local JSON Fallback</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600">
                                  <span>CPU Usage:</span>
                                  <span className="text-slate-800 font-bold">12.4%</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600">
                                  <span>Storage Nodes:</span>
                                  <span className="text-slate-800 font-bold">Public/Uploads (Active)</span>
                                </div>
                              </CardBody>
                            </Card>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. JOBS CMS MODULE */}
              {currentTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Careers Roles CMS</h3>
                    {hasAccess('jobs', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ title: '', slug: '', department: 'Engineering', experience: '', employment_type: 'Full-Time', location: '', salary: '', open_positions: 1, description: '', responsibilities: '', requirements: '', benefits: '', status: 'Draft', working_model: 'Remote', tech_stack: '' }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Role
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <h4 className="font-bold text-slate-800 mb-6 text-sm">{activeForm === 'create' ? 'Add New Career Role' : 'Edit Career Role'}</h4>
                      <form onSubmit={handleSaveJob} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Role Title</label>
                            <Input 
                              type="text" required placeholder="e.g. Frontend Developer Intern" 
                              value={formFields.title} 
                              onChange={(e) => setFormFields({ ...formFields, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Slug (URL)</label>
                            <Input 
                              type="text" required placeholder="frontend-developer-intern" 
                              value={formFields.slug} 
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Department</label>
                            <Select 
                              value={formFields.department} 
                              onChange={(e) => setFormFields({ ...formFields, department: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>Engineering</option>
                              <option>Design</option>
                              <option>Operations</option>
                              <option>Growth & Marketing</option>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Experience</label>
                            <Input 
                              type="text" required placeholder="e.g. 0-1 years (Internship)" 
                              value={formFields.experience} 
                              onChange={(e) => setFormFields({ ...formFields, experience: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Employment Type</label>
                            <Select 
                              value={formFields.employment_type} 
                              onChange={(e) => setFormFields({ ...formFields, employment_type: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>Full-Time</option>
                              <option>Internship</option>
                              <option>Part-Time</option>
                              <option>Contract</option>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Location</label>
                            <Input 
                              type="text" required placeholder="Remote-first" 
                              value={formFields.location} 
                              onChange={(e) => setFormFields({ ...formFields, location: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Salary Range (Optional)</label>
                            <Input 
                              type="text" placeholder="₹15,000 - ₹25,000 / month" 
                              value={formFields.salary || ''} 
                              onChange={(e) => setFormFields({ ...formFields, salary: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Status</label>
                            <Select 
                              value={formFields.status} 
                              onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>Draft</option>
                              <option>Published</option>
                              <option>Archived</option>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Description</label>
                          <Textarea 
                            required placeholder="Describe the role..." 
                            value={formFields.description} 
                            onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-24"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Responsibilities (One per line)</label>
                          <Textarea 
                            placeholder="Write code..." 
                            value={formFields.responsibilities} 
                            onChange={(e) => setFormFields({ ...formFields, responsibilities: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Requirements (One per line)</label>
                          <Textarea 
                            placeholder="CS degree..." 
                            value={formFields.requirements} 
                            onChange={(e) => setFormFields({ ...formFields, requirements: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Benefits (One per line)</label>
                          <Textarea 
                            placeholder="Mentorship..." 
                            value={formFields.benefits} 
                            onChange={(e) => setFormFields({ ...formFields, benefits: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Tech Stack (Comma-separated)</label>
                          <Input 
                            type="text" placeholder="React, TypeScript, Tailwind" 
                            value={formFields.tech_stack} 
                            onChange={(e) => setFormFields({ ...formFields, tech_stack: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Role</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Role</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Department</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Type</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Status</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobs.map((job) => (
                            <tr key={job.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800">{job.title}</td>
                              <td className="py-4 px-6">{job.department}</td>
                              <td className="py-4 px-6">{job.employment_type}</td>
                              <td className="py-4 px-6">
                                <Badge className={`px-2 py-0.5 rounded-full ${
                                  job.status === 'Published' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>{job.status}</Badge>
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('jobs', 'update') && (
                                  <button onClick={() => { setSelectedItem(job); setFormFields({ ...job, responsibilities: job.responsibilities.join('\n'), requirements: job.requirements.join('\n'), benefits: job.benefits.join('\n'), tech_stack: job.tech_stack.join(', ') }); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                                {hasAccess('jobs', 'delete') && (
                                  <button onClick={() => { if(confirm('Delete role?')) deleteJob(job.id).then(() => loadTabData()); }} className="p-1 hover:text-red-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                          {jobs.length === 0 && (
                            <tr>
                              <td colSpan={5} className="text-center py-8 text-xs text-slate-400">No jobs found. Add some above.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 5. CAREERS ATS PIPELINE */}
              {currentTab === 'applicants' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800">Recruitment Candidate ATS</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pipeline Kanban Columns */}
                    <div className="lg:col-span-1 space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Candidate Funnel Stages</h4>
                      <div className="space-y-3">
                        {['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Rejected', 'Hired'].map(stage => {
                          const list = applicants.filter(a => a.status === stage);
                          return (
                            <button
                              key={stage}
                              onClick={() => { setSelectedItem(null); setSelectedItem(list[0] || null); }}
                              className="w-full flex justify-between items-center p-3 bg-white hover:bg-slate-50 border border-slate-100 shadow-sm rounded-xl text-left transition-all"
                            >
                              <div>
                                <h5 className="text-xs font-bold text-slate-800">{stage}</h5>
                                <span className="text-[10px] text-slate-400 mt-0.5 block">{list.length} candidates</span>
                              </div>
                              <Badge className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{list.length}</Badge>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Candidate Profiles List */}
                    <div className="lg:col-span-2 space-y-4">
                      {selectedItem ? (
                        <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6 space-y-6">
                          {/* Profile Header */}
                          <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">{selectedItem.full_name}</h3>
                              <span className="text-xs text-slate-500 font-medium">{selectedItem.college} • {selectedItem.degree} ({selectedItem.year})</span>
                              <div className="flex items-center gap-2 mt-3">
                                <Badge className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full text-[10px]">{selectedItem.status}</Badge>
                                <span className="text-[10px] text-slate-400">Rating: {selectedItem.rating || 0}/5</span>
                              </div>
                            </div>

                            {/* Move Pipeline Status controls */}
                            <div className="flex gap-2">
                              <Select
                                value={selectedItem.status}
                                onChange={async (e) => {
                                  const updated = await updateApplicant(selectedItem.id, { status: e.target.value as any });
                                  setSelectedItem(updated);
                                  loadTabData();
                                }}
                                className="border-slate-200 text-xs text-slate-800 h-9"
                              >
                                <option>Applied</option>
                                <option>Screening</option>
                                <option>Shortlisted</option>
                                <option>Interview</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                                <option>Hired</option>
                              </Select>
                            </div>
                          </div>

                          {/* Profile Info Details Grid */}
                          <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-1">Email</span>
                              <span className="font-medium">{selectedItem.email}</span>
                            </div>
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-1">Phone</span>
                              <span className="font-medium">{selectedItem.phone || 'Not provided'}</span>
                            </div>
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-1">Portfolio</span>
                              <a href={selectedItem.portfolio} target="_blank" className="text-[var(--color-accent)] hover:underline truncate block">{selectedItem.portfolio || 'Not provided'}</a>
                            </div>
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-1">LinkedIn</span>
                              <a href={selectedItem.linkedin} target="_blank" className="text-[var(--color-accent)] hover:underline truncate block">{selectedItem.linkedin || 'Not provided'}</a>
                            </div>
                          </div>

                          {/* Skills checklist */}
                          <div>
                            <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-2">Skills Tags</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedItem.skills.map((s: string, idx: number) => (
                                <Badge key={idx} className="bg-slate-100 text-slate-700">{s}</Badge>
                              ))}
                            </div>
                          </div>

                          {/* Cover letter */}
                          {selectedItem.cover_letter && (
                            <div>
                              <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-2">Cover Letter</span>
                              <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-4 rounded-xl leading-relaxed whitespace-pre-line">{selectedItem.cover_letter}</p>
                            </div>
                          )}

                          {/* Integrated Resume Viewer */}
                          <div>
                            <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono mb-3">Resume Document</span>
                            <Card className="bg-slate-50 border border-slate-100 overflow-hidden">
                              <CardHeader className="flex justify-between items-center bg-slate-100/50 py-3 px-6 border-b border-slate-200/50">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                  <FileText className="w-4 h-4 text-slate-500" /> resume_attachment.pdf
                                </span>
                                <div className="flex items-center gap-3">
                                  {/* Zoom Actions */}
                                  <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="text-xs px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded font-mono font-bold">-</button>
                                  <span className="text-[10px] font-mono font-bold">{zoomLevel}%</span>
                                  <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="text-xs px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded font-mono font-bold">+</button>
                                  <Button href={selectedItem.resume_url} className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-[10px] h-7 px-2.5 rounded shadow-sm">
                                    Download File
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardBody className="p-0 flex justify-center bg-slate-300">
                                {/* Resume iframe placeholder */}
                                <div className="w-full bg-white flex items-center justify-center p-12 text-slate-400 min-h-[300px]" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
                                  <div className="text-center">
                                    <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                    <p className="text-xs font-mono font-semibold">Mock PDF Resume Frame</p>
                                    <p className="text-[10px] mt-1">Local fallback displays PDF attachments cleanly. Click "Download File" to preview.</p>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </div>

                          {/* Recruiter Timeline logs */}
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <span className="block font-semibold text-slate-400 uppercase tracking-wider text-[9px] font-mono">Recruiter Activity Timeline</span>
                            <div className="relative border-l border-slate-100 pl-4 space-y-4 ml-2">
                              {selectedItem.timeline.map((log: any, idx: number) => (
                                <div key={idx} className="relative text-xs text-slate-600">
                                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
                                  <p className="font-bold text-slate-800">{log.action}</p>
                                  <span className="text-[9px] text-slate-400 block mt-0.5">{log.actor} ({log.actor_email}) • {new Date(log.created_at).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <Card className="bg-white border-[var(--color-border-soft)] shadow-sm p-12 text-center text-slate-400 flex flex-col justify-center items-center h-96">
                          <Users className="w-12 h-12 mb-3 text-slate-200" />
                          <h4 className="text-xs font-bold text-slate-600">No Candidate Profile Selected</h4>
                          <p className="text-[10px] mt-1 max-w-xs leading-relaxed">Select a status column stage on the left to review applicants and screen resume documents.</p>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SYSTEM SETTINGS SCREEN */}
              {currentTab === 'settings' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Site & OS Settings</h3>
                    <Button onClick={handleSaveSettings} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">
                      Save All Settings
                    </Button>
                  </div>

                  {settings && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Dynamic Settings Fields */}
                      <Card className="bg-white border-[var(--color-border-soft)] shadow-sm p-6 space-y-6">
                        <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-3 text-xs uppercase tracking-wider font-mono">Company Metadata</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 mb-2 uppercase">Company Brand Name</label>
                            <Input 
                              type="text" 
                              value={settings.company_name} 
                              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 mb-2 uppercase">Contact Email</label>
                            <Input 
                              type="email" 
                              value={settings.contact_email} 
                              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                      </Card>

                      {/* Backup restore */}
                      <Card className="bg-white border-[var(--color-border-soft)] shadow-sm p-6 space-y-6">
                        <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-3 text-xs uppercase tracking-wider font-mono">Database Backups</h4>
                        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                          <p>Backup all workspaces database tables (jobs, applicants, blogs, case studies, CRM, etc.) as a JSON export file.</p>
                          <div className="flex gap-3">
                            <Button onClick={handleExportBackup} className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 h-9 rounded-full font-semibold flex items-center gap-1.5">
                              <Download className="w-4 h-4" /> Download Backup Export
                            </Button>
                          </div>
                        </div>
                      </Card>

                      {/* Navigation Builder Card */}
                      <Card className="bg-white border-[var(--color-border-soft)] shadow-sm p-6 space-y-6 lg:col-span-2">
                        <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-3 text-xs uppercase tracking-wider font-mono">Navigation Menu Builder</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-700">
                          <div>
                            <h5 className="font-bold text-slate-700 mb-3 font-mono text-[10px] uppercase">Header Navigation Menu</h5>
                            <div className="space-y-2 mb-4 bg-slate-50 p-4 border border-slate-100 rounded-xl">
                              {(settings.navigation_header || []).map((link: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center bg-white p-2.5 border border-slate-100 rounded-lg">
                                  <div>
                                    <span className="font-bold text-slate-800">{link.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono ml-2">({link.href})</span>
                                  </div>
                                  <div className="flex gap-1.5">
                                    <button type="button" onClick={() => {
                                      if (idx > 0) {
                                        const head = [...settings.navigation_header];
                                        const tmp = head[idx];
                                        head[idx] = head[idx-1];
                                        head[idx-1] = tmp;
                                        setSettings({ ...settings, navigation_header: head });
                                      }
                                    }} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] rounded">▲</button>
                                    <button type="button" onClick={() => {
                                      if (idx < settings.navigation_header.length - 1) {
                                        const head = [...settings.navigation_header];
                                        const tmp = head[idx];
                                        head[idx] = head[idx+1];
                                        head[idx+1] = tmp;
                                        setSettings({ ...settings, navigation_header: head });
                                      }
                                    }} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] rounded">▼</button>
                                    <button type="button" onClick={() => {
                                      const head = settings.navigation_header.filter((_: any, i: number) => i !== idx);
                                      setSettings({ ...settings, navigation_header: head });
                                    }} className="text-red-500 hover:text-red-700 font-bold ml-2">🗑</button>
                                  </div>
                                </div>
                              ))}
                              {(settings.navigation_header || []).length === 0 && <p className="text-[10px] text-slate-400 text-center py-2">No header links configured.</p>}
                            </div>
                            <div className="flex gap-2">
                              <Input id="new-head-label" placeholder="Link Label" className="border-slate-200 text-xs h-9 bg-white" />
                              <Input id="new-head-url" placeholder="URL (e.g. /careers)" className="border-slate-200 text-xs h-9 bg-white" />
                              <Button onClick={() => {
                                const lblInput = document.getElementById('new-head-label') as HTMLInputElement;
                                const urlInput = document.getElementById('new-head-url') as HTMLInputElement;
                                if (lblInput?.value && urlInput?.value) {
                                  const head = [...(settings.navigation_header || []), { label: lblInput.value, href: urlInput.value }];
                                  setSettings({ ...settings, navigation_header: head });
                                  lblInput.value = '';
                                  urlInput.value = '';
                                }
                              }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white text-[10px] h-9 px-3 rounded-lg">Add</Button>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-bold text-slate-700 mb-3 font-mono text-[10px] uppercase">Footer Navigation Menu</h5>
                            <div className="space-y-2 mb-4 bg-slate-50 p-4 border border-slate-100 rounded-xl">
                              {(settings.navigation_footer || []).map((link: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center bg-white p-2.5 border border-slate-100 rounded-lg">
                                  <div>
                                    <span className="font-bold text-slate-800">{link.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono ml-2">({link.href})</span>
                                  </div>
                                  <div className="flex gap-1.5">
                                    <button type="button" onClick={() => {
                                      if (idx > 0) {
                                        const foot = [...settings.navigation_footer];
                                        const tmp = foot[idx];
                                        foot[idx] = foot[idx-1];
                                        foot[idx-1] = tmp;
                                        setSettings({ ...settings, navigation_footer: foot });
                                      }
                                    }} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] rounded">▲</button>
                                    <button type="button" onClick={() => {
                                      if (idx < settings.navigation_footer.length - 1) {
                                        const foot = [...settings.navigation_footer];
                                        const tmp = foot[idx];
                                        foot[idx] = foot[idx+1];
                                        foot[idx+1] = tmp;
                                        setSettings({ ...settings, navigation_footer: foot });
                                      }
                                    }} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] rounded">▼</button>
                                    <button type="button" onClick={() => {
                                      const foot = settings.navigation_footer.filter((_: any, i: number) => i !== idx);
                                      setSettings({ ...settings, navigation_footer: foot });
                                    }} className="text-red-500 hover:text-red-700 font-bold ml-2">🗑</button>
                                  </div>
                                </div>
                              ))}
                              {(settings.navigation_footer || []).length === 0 && <p className="text-[10px] text-slate-400 text-center py-2">No footer links configured.</p>}
                            </div>
                            <div className="flex gap-2">
                              <Input id="new-foot-label" placeholder="Link Label" className="border-slate-200 text-xs h-9 bg-white" />
                              <Input id="new-foot-url" placeholder="URL" className="border-slate-200 text-xs h-9 bg-white" />
                              <Button onClick={() => {
                                const lblInput = document.getElementById('new-foot-label') as HTMLInputElement;
                                const urlInput = document.getElementById('new-foot-url') as HTMLInputElement;
                                if (lblInput?.value && urlInput?.value) {
                                  const foot = [...(settings.navigation_footer || []), { label: lblInput.value, href: urlInput.value }];
                                  setSettings({ ...settings, navigation_footer: foot });
                                  lblInput.value = '';
                                  urlInput.value = '';
                                }
                              }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white text-[10px] h-9 px-3 rounded-lg">Add</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Audit Logs Trail widget */}
                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardHeader className="border-b border-slate-100 py-4 px-6">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">System Audit Log Trail</h4>
                    </CardHeader>
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Actor</th>
                            <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Action</th>
                            <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">IP Address</th>
                            <th className="text-left py-3 px-6 text-xs text-slate-400 font-bold uppercase">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auditLogs.slice(0, 8).map((log, index) => (
                            <tr key={index} className="border-b border-slate-50 text-xs text-slate-700 font-mono">
                              <td className="py-3.5 px-6 font-bold">{log.user_email}</td>
                              <td className="py-3.5 px-6">{log.action}</td>
                              <td className="py-3.5 px-6">{log.ip_address}</td>
                              <td className="py-3.5 px-6 opacity-70">{new Date(log.created_at).toLocaleString()}</td>
                            </tr>
                          ))}
                          {auditLogs.length === 0 && (
                            <tr>
                              <td colSpan={4} className="text-center py-6 text-xs text-slate-400">No actions logged yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 7. BLOGS CMS SCREEN */}
              {currentTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Blogs & Insights CMS</h3>
                    {hasAccess('blogs', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ title: '', slug: '', summary: '', content: '', category: 'AI Engineering', tags: '', author: 'Qeltrava AI Engineering Team', read_time: '5 min read', published: false }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Post
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const data = {
                          ...formFields,
                          tags: formFields.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
                        };
                        if (activeForm === 'create') {
                          await createBlog(data);
                        } else if (activeForm === 'edit' && selectedItem) {
                          await updateBlog(selectedItem.id, data);
                        }
                        setActiveForm(null);
                        setSelectedItem(null);
                        loadTabData();
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Title</label>
                            <Input 
                              type="text" required value={formFields.title}
                              onChange={(e) => setFormFields({ ...formFields, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Slug (URL)</label>
                            <Input 
                              type="text" required value={formFields.slug}
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Category</label>
                            <Select 
                              value={formFields.category}
                              onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>AI Engineering</option>
                              <option>Enterprise Architecture</option>
                              <option>Product & Delivery</option>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Author</label>
                            <Input 
                              type="text" required value={formFields.author}
                              onChange={(e) => setFormFields({ ...formFields, author: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Read Time</label>
                            <Input 
                              type="text" required value={formFields.read_time}
                              onChange={(e) => setFormFields({ ...formFields, read_time: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Summary</label>
                          <Textarea 
                            required value={formFields.summary}
                            onChange={(e) => setFormFields({ ...formFields, summary: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-16"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Content (Markdown supported)</label>
                          <Textarea 
                            required value={formFields.content}
                            onChange={(e) => setFormFields({ ...formFields, content: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-48 font-mono leading-relaxed"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Post</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Title</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Category</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Author</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((b) => (
                            <tr key={b.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800 truncate max-w-xs">{b.title}</td>
                              <td className="py-4 px-6">{b.category}</td>
                              <td className="py-4 px-6">{b.author}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('blogs', 'update') && (
                                  <button onClick={() => { setSelectedItem(b); setFormFields({ ...b, tags: b.tags.join(', ') }); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                                {hasAccess('blogs', 'delete') && (
                                  <button onClick={async () => { if(confirm('Delete post?')) { await deleteBlog(b.id); loadTabData(); } }} className="p-1 hover:text-red-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 8. CASE STUDIES CMS SCREEN */}
              {currentTab === 'case-studies' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Case Studies CMS</h3>
                    {hasAccess('caseStudies', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ title: '', slug: '', client: '', industry: 'Financial Services', problem: '', solution: '', tech_stack: '', timeline: '12 weeks', published: false }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Case Study
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const data = {
                          ...formFields,
                          tech_stack: formFields.tech_stack.split(',').map((t: string) => t.trim()).filter((t: string) => t !== ''),
                          results: [],
                          metrics: []
                        };
                        if (activeForm === 'create') {
                          await createCaseStudy(data);
                        } else if (activeForm === 'edit' && selectedItem) {
                          await updateCaseStudy(selectedItem.id, data);
                        }
                        setActiveForm(null);
                        setSelectedItem(null);
                        loadTabData();
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Client Name</label>
                            <Input 
                              type="text" required value={formFields.client}
                              onChange={(e) => setFormFields({ ...formFields, client: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Industry</label>
                            <Input 
                              type="text" required value={formFields.industry}
                              onChange={(e) => setFormFields({ ...formFields, industry: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Case Title</label>
                            <Input 
                              type="text" required value={formFields.title}
                              onChange={(e) => setFormFields({ ...formFields, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Slug (URL)</label>
                            <Input 
                              type="text" required value={formFields.slug}
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">The Problem / Challenge</label>
                          <Textarea 
                            required value={formFields.problem}
                            onChange={(e) => setFormFields({ ...formFields, problem: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">The Engineering Solution</label>
                          <Textarea 
                            required value={formFields.solution}
                            onChange={(e) => setFormFields({ ...formFields, solution: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-20"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Technologies Stack (Comma-separated)</label>
                            <Input 
                              type="text" required value={formFields.tech_stack}
                              onChange={(e) => setFormFields({ ...formFields, tech_stack: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Timeline</label>
                            <Input 
                              type="text" required value={formFields.timeline}
                              onChange={(e) => setFormFields({ ...formFields, timeline: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Case Study</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Client</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Industry</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Case Title</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseStudies.map((c) => (
                            <tr key={c.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800">{c.client}</td>
                              <td className="py-4 px-6">{c.industry}</td>
                              <td className="py-4 px-6 truncate max-w-xs">{c.title}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('caseStudies', 'update') && (
                                  <button onClick={() => { setSelectedItem(c); setFormFields({ ...c, tech_stack: c.tech_stack.join(', ') }); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                                {hasAccess('caseStudies', 'delete') && (
                                  <button onClick={async () => { if(confirm('Delete study?')) { await deleteCaseStudy(c.id); loadTabData(); } }} className="p-1 hover:text-red-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 9. PRODUCTS & MODLIQ SCREEN */}
              {currentTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Products & Modliq Manager</h3>
                    {hasAccess('products', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ name: '', slug: '', status: 'Beta', overview: '', documentation_url: '', website_url: '', pricing: '', published: false }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Product
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const data = {
                          ...formFields,
                          features: [],
                          roadmap: [],
                          pricing: {}
                        };
                        if (activeForm === 'create') {
                          await createProduct(data);
                        } else if (activeForm === 'edit' && selectedItem) {
                          await updateProduct(selectedItem.id, data);
                        }
                        setActiveForm(null);
                        setSelectedItem(null);
                        loadTabData();
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Product Name</label>
                            <Input 
                              type="text" required value={formFields.name}
                              onChange={(e) => setFormFields({ ...formFields, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Slug (URL)</label>
                            <Input 
                              type="text" required value={formFields.slug}
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Launch Status</label>
                            <Select 
                              value={formFields.status}
                              onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>Coming Soon</option>
                              <option>Beta</option>
                              <option>Live</option>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Website URL</label>
                            <Input 
                              type="text" value={formFields.website_url}
                              onChange={(e) => setFormFields({ ...formFields, website_url: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Doc URL</label>
                            <Input 
                              type="text" value={formFields.documentation_url}
                              onChange={(e) => setFormFields({ ...formFields, documentation_url: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Product Overview</label>
                          <Textarea 
                            required value={formFields.overview}
                            onChange={(e) => setFormFields({ ...formFields, overview: e.target.value })}
                            className="border-slate-200 text-xs text-slate-800 h-24"
                          />
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Product</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Product</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">URL</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Status</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((p) => (
                            <tr key={p.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800">{p.name}</td>
                              <td className="py-4 px-6">{p.website_url || 'N/A'}</td>
                              <td className="py-4 px-6">
                                <Badge className="bg-blue-55 text-blue-700">{p.status}</Badge>
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('products', 'update') && (
                                  <button onClick={() => { setSelectedItem(p); setFormFields(p); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                                {hasAccess('products', 'delete') && (
                                  <button onClick={async () => { if(confirm('Delete product?')) { await deleteProduct(p.id); loadTabData(); } }} className="p-1 hover:text-red-500 transition-colors"><Trash className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 10. MEDIA LIBRARY FILE MANAGER */}
              {currentTab === 'media' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Media Library</h3>
                    {hasAccess('media', 'create') && (
                      <label className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center justify-center gap-1.5 cursor-pointer shadow-md">
                        <Upload className="w-4 h-4" /> Upload Media File
                        <input type="file" onChange={handleFileUpload} className="hidden" />
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {media.map((file) => (
                      <Card key={file.id} className="bg-white border-[var(--color-border-soft)] shadow-sm overflow-hidden flex flex-col justify-between h-48">
                        <div className="p-4 flex-grow flex flex-col justify-center items-center bg-slate-50 border-b border-slate-100">
                          <FolderOpen className="w-8 h-8 text-slate-300" />
                          <span className="text-[10px] text-slate-500 text-center truncate max-w-full font-mono mt-2 block">{file.filename}</span>
                        </div>
                        <div className="p-3 flex justify-between items-center bg-white">
                          <span className="text-[9px] font-mono text-slate-400">{(file.file_size / 1024).toFixed(1)} KB</span>
                          <div className="flex gap-2">
                            <button onClick={() => { if(confirm('Delete asset?')) deleteMediaFile(file.id).then(() => loadTabData()); }} className="text-red-500 hover:text-red-700 transition-colors"><Trash className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {media.length === 0 && (
                      <div className="col-span-4 text-center py-12 text-slate-400 text-xs">
                        <FolderOpen className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                        No assets uploaded yet. Try uploading above.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 11. CRM SALES LEADS SCREEN */}
              {currentTab === 'crm' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">CRM Sales Opportunities</h3>
                    {hasAccess('crm', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ contact_name: '', company_name: '', email: '', phone: '', status: 'New', deal_value: 0, pipeline_stage: 'Lead Intake' }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Lead Opportunity
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (activeForm === 'create') {
                          await createCrmLead(formFields);
                        } else if (activeForm === 'edit' && selectedItem) {
                          await updateCrmLead(selectedItem.id, formFields);
                        }
                        setActiveForm(null);
                        setSelectedItem(null);
                        loadTabData();
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Contact Name</label>
                            <Input 
                              type="text" required value={formFields.contact_name}
                              onChange={(e) => setFormFields({ ...formFields, contact_name: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Company Name</label>
                            <Input 
                              type="text" value={formFields.company_name}
                              onChange={(e) => setFormFields({ ...formFields, company_name: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Email</label>
                            <Input 
                              type="email" required value={formFields.email}
                              onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Deal Value ($)</label>
                            <Input 
                              type="number" required value={formFields.deal_value}
                              onChange={(e) => setFormFields({ ...formFields, deal_value: Number(e.target.value) })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Pipeline Stage</label>
                            <Select 
                              value={formFields.pipeline_stage}
                              onChange={(e) => setFormFields({ ...formFields, pipeline_stage: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            >
                              <option>Lead Intake</option>
                              <option>Proposal Out</option>
                              <option>Contract Sent</option>
                              <option>Deal Won</option>
                              <option>Lost</option>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Opportunity</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Lead Contact</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Company</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Stage</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Value</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crmLeads.map((lead) => (
                            <tr key={lead.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800">{lead.contact_name}</td>
                              <td className="py-4 px-6">{lead.company_name || 'N/A'}</td>
                              <td className="py-4 px-6">
                                <Badge className="bg-amber-50 text-amber-700">{lead.pipeline_stage}</Badge>
                              </td>
                              <td className="py-4 px-6 font-mono font-bold text-slate-850">${lead.deal_value || 0}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('crm', 'update') && (
                                  <button onClick={() => { setSelectedItem(lead); setFormFields(lead); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* 12. CLIENT PORTAL MANAGER SCREEN */}
              {currentTab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Client Portal Workspace Accounts</h3>
                    {hasAccess('clients', 'create') && (
                      <Button onClick={() => { setSelectedItem(null); setFormFields({ company_name: '', primary_email: '' }); setActiveForm('create'); }} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Client Account
                      </Button>
                    )}
                  </div>

                  {activeForm && (
                    <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-6">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (activeForm === 'create') {
                          await createClientPortalAccount(formFields);
                        } else if (activeForm === 'edit' && selectedItem) {
                          await updateClientPortalAccount(selectedItem.id, formFields);
                        }
                        setActiveForm(null);
                        setSelectedItem(null);
                        loadTabData();
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Client Company</label>
                            <Input 
                              type="text" required value={formFields.company_name}
                              onChange={(e) => setFormFields({ ...formFields, company_name: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">Primary Login Email</label>
                            <Input 
                              type="email" required value={formFields.primary_email}
                              onChange={(e) => setFormFields({ ...formFields, primary_email: e.target.value })}
                              className="border-slate-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                          <Button onClick={() => { setActiveForm(null); setSelectedItem(null); }} variant="outline" className="rounded-full text-xs font-semibold h-9 px-4">Cancel</Button>
                          <Button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-9 px-4">Save Account</Button>
                        </div>
                      </form>
                    </Card>
                  )}

                  <Card className="bg-white border-[var(--color-border-soft)] shadow-sm">
                    <CardBody className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Company</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Login Email</th>
                            <th className="text-left py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Projects Status</th>
                            <th className="text-right py-3.5 px-6 text-xs text-slate-400 font-bold uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientAccounts.map((c) => (
                            <tr key={c.id} className="border-b border-slate-50 text-xs text-slate-700">
                              <td className="py-4 px-6 font-bold text-slate-800">{c.company_name}</td>
                              <td className="py-4 px-6">{c.primary_email}</td>
                              <td className="py-4 px-6">
                                <span className="font-semibold text-slate-500">{c.projects?.length || 0} active projects</span>
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {hasAccess('clients', 'update') && (
                                  <button onClick={() => { setSelectedItem(c); setFormFields(c); setActiveForm('edit'); }} className="p-1 hover:text-[var(--color-accent)] transition-colors"><Edit className="w-4 h-4" /></button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Notion-style command palette modal popup */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-[#090d16]/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <Card className="w-full max-w-xl bg-[#111827] border-[#1f2937] text-white p-4 shadow-2xl relative">
            <div className="flex items-center gap-3 border-b border-[#1f2937] pb-3 mb-3">
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text" 
                autoFocus 
                placeholder="Search jobs, candidates, blogs, case studies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-white/40"
              />
              <button onClick={() => setShowSearchModal(false)} className="text-xs text-white/40 border border-[#1f2937] px-2 py-0.5 rounded hover:bg-slate-800">ESC</button>
            </div>
            {/* Mock search list details */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] text-white/40 font-mono uppercase block px-2 mb-1">Workspace Matches</span>
              <div className="p-2.5 rounded-lg hover:bg-slate-800 flex justify-between cursor-pointer">
                <span>Frontend Developer Intern (Careers)</span>
                <span className="text-white/40 font-mono">Go to Module</span>
              </div>
              <div className="p-2.5 rounded-lg hover:bg-slate-800 flex justify-between cursor-pointer">
                <span>AI-Native Software Architecture Blog (CMS)</span>
                <span className="text-white/40 font-mono">Go to Module</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
