// app/[locale]/portal/page.tsx
// Public Client Portal: Project trackers, ticket systems, and invoice downloads

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, CheckCircle2, Circle, AlertCircle, FileText, 
  Send, Lock, LogOut, Download, Activity, Clock
} from 'lucide-react';
import { 
  Button, Card, CardHeader, CardBody, Badge, 
  Input, Textarea, Spinner, Alert 
} from '@/design-system';

// Server Actions
import { getClientPortalAccounts, updateClientPortalAccount } from '@/platform/shared/actions';

export default function ClientPortalWorkspace() {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketStatus, setTicketStatus] = useState<string>('');

  // 1. Handle Client Account Authentication
  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const accounts = await getClientPortalAccounts();
      // Match client email case-insensitive
      const match = accounts.find(a => a.primary_email.toLowerCase() === email.toLowerCase().trim());
      if (match) {
        setClientData(match);
        setIsAuthenticated(true);
        localStorage.setItem('qeltrava_client_email', match.primary_email);
      } else {
        setLoginError('No client portal account found matching this email address.');
      }
    } catch (err) {
      setLoginError('A network error occurred. Please try again.');
    }
    setLoading(false);
  };

  // Check persistent login on mount
  useEffect(() => {
    async function checkPersistedClient() {
      const persistedEmail = localStorage.getItem('qeltrava_client_email');
      if (persistedEmail) {
        setLoading(true);
        try {
          const accounts = await getClientPortalAccounts();
          const match = accounts.find(a => a.primary_email.toLowerCase() === persistedEmail.toLowerCase().trim());
          if (match) {
            setClientData(match);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      }
    }
    checkPersistedClient();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('qeltrava_client_email');
    setIsAuthenticated(false);
    setClientData(null);
    setEmail('');
  };

  // 2. Submit Support Ticket Action
  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;

    setLoading(true);
    setTicketStatus('');
    try {
      const newTicket = {
        id: `ticket-${Date.now()}`,
        subject: ticketSubject,
        message: ticketMsg,
        status: 'Open',
        created_at: new Date().toISOString()
      };

      const currentTickets = clientData.tickets || [];
      const updatedAccount = await updateClientPortalAccount(clientData.id, {
        tickets: [...currentTickets, newTicket]
      });

      setClientData(updatedAccount);
      setTicketSubject('');
      setTicketMsg('');
      setTicketStatus('Ticket logged! Our support team will reply inside 2 hours.');
    } catch (err) {
      setTicketStatus('Failed to log support ticket.');
    }
    setLoading(false);
  };

  // Mock invoice PDF downloader
  const downloadInvoiceMock = (invId: string) => {
    const data = `Invoice Statement for ${clientData.company_name}\nInvoice ID: ${invId}\nStatus: Paid\nProcessed: Qeltrava Payment Gateway`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invId}.txt`;
    a.click();
  };

  // Loading indicator
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-white">
        <Spinner size="lg" className="border-[var(--color-accent)]" />
      </div>
    );
  }

  // 3. RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 relative overflow-hidden text-white font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_40%)] pointer-events-none" />
        
        <Card className="w-full max-w-md bg-[#111827]/80 border-[#1f2937] backdrop-blur-md shadow-2xl p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 font-bold text-xl">
              CP
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Client Portal</h1>
            <p className="text-xs text-white/50 mt-1 font-mono">Qeltrava Company Workspace Workspace</p>
          </div>

          {loginError && (
            <Alert variant="danger" className="mb-6 bg-red-950/40 border-red-900/60 text-red-200">
              <AlertCircle className="w-4 h-4 mr-2" />
              {loginError}
            </Alert>
          )}

          <form onSubmit={handleClientLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 font-mono">Login Email Address</label>
              <Input 
                type="email" 
                required 
                placeholder="client@company.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1f2937]/50 border-[#374151] text-white focus:border-indigo-500"
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-500 h-11 text-xs font-semibold rounded-full mt-6 shadow-md flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4" /> Access Workspace Portal
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // 4. RENDER CLIENT WORKSPACE DASHBOARD
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-10">
        
        {/* Workspace Brand Header bar */}
        <header className="flex justify-between items-center bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm">
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-indigo-100 rounded-full uppercase tracking-wider">Active Project Sandbox</span>
            <h1 className="text-2xl font-extrabold text-[var(--color-primary-dark)] mt-2">{clientData.company_name}</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Workspace Manager: client@modliq.com</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-xs font-semibold rounded-full h-9 px-4 flex items-center gap-1.5 hover:text-red-600 hover:border-red-200 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </header>

        {/* Dashboard Grid blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main sections columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Project milestones progress tracker */}
            <Card className="bg-white border-slate-200/50 shadow-sm p-6 space-y-6">
              <h2 className="text-base font-bold text-[var(--color-primary-dark)] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Activity className="w-5 h-5 text-indigo-500" /> Project Milestones Tracker
              </h2>

              <div className="relative border-l-2 border-slate-100 pl-6 space-y-6 ml-3">
                {(clientData.projects?.[0]?.milestones || [
                  { name: 'Phase 1: Architecture Blueprint & Requirements Sync', status: 'completed', dueDate: '2026-07-10' },
                  { name: 'Phase 2: Database Schema & Authentication Layer Deployment', status: 'completed', dueDate: '2026-07-20' },
                  { name: 'Phase 3: Core Workspace Admin Panels & CMS Release', status: 'in-progress', dueDate: '2026-08-05' },
                  { name: 'Phase 4: Client Portal Milestones & CRM Integration Checks', status: 'planned', dueDate: '2026-08-20' }
                ]).map((milestone: any, idx: number) => (
                  <div key={idx} className="relative text-xs">
                    <span className="absolute -left-[31px] top-0.5 bg-white rounded-full">
                      {milestone.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-indigo-500 fill-indigo-50 animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 fill-slate-50" />
                      )}
                    </span>
                    <h3 className="font-bold text-slate-800 leading-snug">{milestone.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <Badge className={`px-2 py-0.5 rounded-full text-[9px] ${
                        milestone.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                        milestone.status === 'in-progress' ? 'bg-indigo-50 text-indigo-700 animate-pulse' :
                        'bg-slate-100 text-slate-500'
                      }`}>{milestone.status}</Badge>
                      {milestone.dueDate && (
                        <span className="text-[10px] text-slate-400 font-mono">Due: {milestone.dueDate}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Invoices List block */}
            <Card className="bg-white border-slate-200/50 shadow-sm p-6 space-y-6">
              <h2 className="text-base font-bold text-[var(--color-primary-dark)] flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-indigo-500" /> Billing Statements & Invoices
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Invoice ID</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                      <th className="text-right py-3 px-4 text-xs font-bold text-slate-400 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(clientData.invoices || [
                      { id: 'INV-2026-001', amount: '2,500', status: 'Paid' },
                      { id: 'INV-2026-002', amount: '5,000', status: 'Paid' }
                    ]).map((inv: any) => (
                      <tr key={inv.id} className="border-b border-slate-50 text-xs text-slate-700">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{inv.id}</td>
                        <td className="py-3 px-4 font-mono font-semibold">${inv.amount}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-emerald-50 text-emerald-700">{inv.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => downloadInvoiceMock(inv.id)} className="text-indigo-650 hover:underline flex items-center gap-1 ml-auto"><Download className="w-3.5 h-3.5" /> PDF</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar Support tickets columns */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Support ticketing logging widget */}
            <Card className="bg-white border-slate-200/50 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] border-b border-slate-100 pb-2">Submit Support Ticket</h3>
              
              {ticketStatus && (
                <Alert variant="info" className="bg-blue-50 border-blue-100 text-blue-800 text-[10px] p-3 leading-relaxed">
                  {ticketStatus}
                </Alert>
              )}

              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-550 mb-1.5 uppercase">Subject</label>
                  <Input 
                    type="text" required placeholder="Milestone query..." 
                    value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)}
                    className="border-slate-200 text-xs h-9 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-550 mb-1.5 uppercase">Message Description</label>
                  <Textarea 
                    required placeholder="Write details..." 
                    value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)}
                    className="border-slate-200 text-xs h-20 text-slate-800"
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-650 hover:bg-indigo-600 text-white rounded-full text-xs font-semibold h-9 flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Send Support Ticket
                </Button>
              </form>
            </Card>

            {/* Tickets logs list */}
            <Card className="bg-white border-slate-200/50 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] border-b border-slate-100 pb-2">Logged Tickets History</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {(clientData.tickets || []).map((t: any) => (
                  <div key={t.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1.5">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 truncate pr-2">{t.subject}</h4>
                      <Badge className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider">{t.status}</Badge>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-[11px]">{t.message}</p>
                    <span className="text-[9px] text-slate-400 block font-mono mt-1">{new Date(t.created_at).toLocaleString()}</span>
                  </div>
                ))}
                {(clientData.tickets || []).length === 0 && (
                  <p className="text-center text-xs text-slate-400 py-4">No logged support tickets.</p>
                )}
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
