// src/pages/UsersPage.jsx — Full admin user management
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { Users, Trash2, ChevronDown, Search, RefreshCw, Shield } from 'lucide-react';

const UsersPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [changingRole, setChangingRole] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users', { params: { page, limit: 10 } });
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted');
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const handleRoleChange = async (id, role) => {
    setChangingRole(id);
    try {
      await api.put(`/users/${id}/role`, { role });
      toast.success(`Role updated to ${role}`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change role');
    } finally {
      setChangingRole(null);
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleColor = (role) => {
    if (role === 'fullAdmin') return 'var(--accent-primary)';
    if (role === 'admin') return '#f59e0b';
    return '#a78bfa';
  };

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeIn 0.4s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '6px' }}>Users</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {users.length} registered user{users.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchUsers}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Full Admins', count: users.filter(u => u.role === 'fullAdmin').length, color: 'var(--accent-primary)' },
            { label: 'Admins', count: users.filter(u => u.role === 'admin').length, color: '#f59e0b' },
            { label: 'Users', count: users.filter(u => u.role === 'user').length, color: '#a78bfa' },
          ].map(({ label, count, color }) => (
            <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
              <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', fontWeight: '700', color }}>{count}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search & Pagination Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="form-input" placeholder="Search by name, email, or role..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '44px' }} />
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Showing {users.length} of {pagination.total} results
          </div>
        </div>

        {/* Users Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 2.5fr 150px 180px 100px',
            padding: '14px 24px', background: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            <span>Name</span><span>Email</span><span>Role</span><span>Joined</span><span>Actions</span>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <div className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <Users size={40} style={{ opacity: 0.25 }} />
              <p style={{ fontWeight: '600' }}>No users found</p>
            </div>
          ) : (
            filtered.map((u, i) => (
              <div key={u._id} style={{
                display: 'grid', gridTemplateColumns: '2fr 2.5fr 150px 180px 100px',
                padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)',
                alignItems: 'center', transition: 'background 0.15s ease',
                animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
                opacity: u._id === currentUser?._id ? 0.7 : 1,
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${getRoleColor(u.role)}33, ${getRoleColor(u.role)}15)`,
                    border: `1px solid ${getRoleColor(u.role)}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: '700', color: getRoleColor(u.role),
                  }}>
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{u.name}</div>
                    {u._id === currentUser?._id && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '600' }}>You</div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {u.email}
                </span>

                {/* Role Select */}
                <div style={{ position: 'relative' }}>
                  {u._id === currentUser?._id ? (
                    <span className={`badge badge-${u.role}`}>{u.role}</span>
                  ) : (
                    <select
                      value={u.role}
                      onChange={e => handleRoleChange(u._id, e.target.value)}
                      disabled={changingRole === u._id}
                      className="form-select"
                      style={{ padding: '6px 28px 6px 10px', fontSize: '0.8rem' }}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                      <option value="fullAdmin">fullAdmin</option>
                    </select>
                  )}
                </div>

                {/* Joined */}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {new Date(u.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>

                {/* Actions */}
                <div>
                  {u._id !== currentUser?._id && u.role !== 'fullAdmin' && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id, u.name)} disabled={deleting === u._id} style={{ padding: '6px 12px' }}>
                      {deleting === u._id ? <div className="spinner" style={{ width: '12px', height: '12px', borderWidth: '2px' }} /> : <Trash2 size={13} />}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
            <button
              className="btn btn-secondary btn-sm"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Page {page} of {pagination.pages}
            </div>
            <button
              className="btn btn-secondary btn-sm"
              disabled={page === pagination.pages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;