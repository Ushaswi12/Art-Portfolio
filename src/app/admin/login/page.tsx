'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { Loader2, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { useMagneticCursor } from '@/components/effects/Cursor';

export default function AdminLogin() {
  const router = useRouter();
  const magnetic = useMagneticCursor();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: data.password }),
    });
    const result = await res.json();
    if (res.ok) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      setError(result.error || 'Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-[28rem] glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-[var(--color-primary)]" aria-hidden="true" />
          </div>
          <h1 className="font-display font-semibold text-[var(--text-h2)] text-[var(--color-text)] mb-2">Admin Access</h1>
          <p className="text-[var(--color-text-muted)]">Enter password to manage portfolio</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-red-400 text-[var(--text-sm)] mb-4 text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </div>
            </motion.div>
          )}

          <div className="mb-6">
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter admin password"
                className={`input-field pr-12 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                autoFocus
                autoComplete="current-password"
                disabled={errors.password?.type === 'submit'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                {...magnetic}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={errors.password?.type === 'submit'}
            className="btn-primary w-full"
          >
            <motion.span 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full"
            >
              {errors.password?.type === 'submit' ? (
                <>
                  <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                  Verifying...
                </>
              ) : (
                <>
                  <Unlock size={20} />
                  Access Admin Panel
                </>
              )}
            </motion.span>
          </button>
        </form>

        <p className="text-center text-[var(--text-xs)] text-[var(--color-text-subtle)] mt-6">
          This page is hidden. Bookmark <code className="bg-[var(--color-surface-muted)] px-1.5 py-0.5 rounded text-[var(--text-xs)] border border-[var(--color-border-default)]">/admin</code> for access.
        </p>
        </div>
      </motion.div>
    </div>
  );
}