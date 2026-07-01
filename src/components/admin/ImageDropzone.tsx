'use client';

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Loader2, X, CheckCircle } from 'lucide-react';

interface ImageDropzoneProps {
  /** The current image URL/path (from form state) */
  value?: string;
  /** Called with the new uploaded URL when upload succeeds */
  onChange: (url: string) => void;
  /** Unique ID for this dropzone slot (used for the hidden <input> id) */
  fieldId: string;
  /** Optional label shown above the dropzone */
  label?: string;
  /** Optional placeholder hint text */
  placeholder?: string;
}

type UploadState = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

export function ImageDropzone({
  value,
  onChange,
  fieldId,
  label,
  placeholder = 'Drop image here or click to browse',
}: ImageDropzoneProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Only image files are supported.');
        setUploadState('error');
        setTimeout(() => { setUploadState('idle'); setErrorMsg(null); }, 3000);
        return;
      }

      setUploadState('uploading');
      setErrorMsg(null);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `Upload failed (${res.status})`);
        }

        const { url } = await res.json();
        onChange(url);
        setUploadState('success');
        setTimeout(() => setUploadState('idle'), 2500);
      } catch (err: any) {
        setErrorMsg(err?.message || 'Upload failed. Try again.');
        setUploadState('error');
        setTimeout(() => { setUploadState('idle'); setErrorMsg(null); }, 4000);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setUploadState('idle');
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadState('dragging');
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadState('idle');
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset so same file can be re-selected
    e.target.value = '';
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setUploadState('idle');
  };

  const isDragging = uploadState === 'dragging';
  const isUploading = uploadState === 'uploading';
  const isSuccess = uploadState === 'success';
  const isError = uploadState === 'error';

  const borderColor = isDragging
    ? 'border-[var(--color-primary)]'
    : isError
    ? 'border-red-500'
    : isSuccess
    ? 'border-green-500'
    : 'border-[var(--color-border-default)]';

  const bgColor = isDragging
    ? 'bg-[var(--color-primary)]/5'
    : isError
    ? 'bg-red-500/5'
    : isSuccess
    ? 'bg-green-500/5'
    : 'bg-[var(--color-surface-muted)]/40';

  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="label">{label}</label>}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={`dropzone-input-${fieldId}`}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileSelect}
        aria-label={`Upload image for ${fieldId}`}
      />

      {/* Dropzone area */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Drop zone for ${label ?? fieldId}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !isUploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative flex flex-col items-center justify-center gap-3
          min-h-[120px] w-full rounded-xl border-2 border-dashed
          transition-all duration-200 cursor-pointer select-none
          ${borderColor} ${bgColor}
          ${isUploading ? 'pointer-events-none' : 'hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'}
        `}
      >
        {/* Existing image preview strip */}
        {value && !isUploading && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            {/* Blurred background preview */}
            <img
              src={value}
              alt="Current image"
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-105"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Centered thumbnail */}
            <div className="relative flex items-center justify-center h-full">
              <img
                src={value}
                alt="Current image preview"
                className="max-h-20 max-w-[160px] object-contain rounded-md shadow-md border border-[var(--color-border-default)]"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            {/* Clear button */}
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer shadow-sm"
              aria-label="Clear image"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Overlay content */}
        <div className={`relative z-10 flex flex-col items-center gap-2 text-center px-4 ${value && !isUploading ? 'opacity-0 hover:opacity-100 transition-opacity duration-200 bg-[var(--color-surface)]/80 rounded-lg py-2 px-3' : ''}`}>
          {isUploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-[var(--color-primary)]" />
              <p className="text-xs text-[var(--color-text-muted)]">Uploading...</p>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle size={24} className="text-green-500" />
              <p className="text-xs text-green-400">Uploaded successfully!</p>
            </>
          ) : isError ? (
            <>
              <X size={24} className="text-red-400" />
              <p className="text-xs text-red-400">{errorMsg}</p>
            </>
          ) : isDragging ? (
            <>
              <Upload size={24} className="text-[var(--color-primary)]" />
              <p className="text-xs text-[var(--color-primary)] font-medium">Drop to upload</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                {value ? (
                  <Upload size={18} className="text-[var(--color-primary)]" />
                ) : (
                  <ImageIcon size={18} className="text-[var(--color-primary)]" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--color-text)]">
                  {value ? 'Drop new image to replace' : placeholder}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                  JPG, PNG, WebP, GIF supported
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Current path display (read-only) */}
      {value && (
        <p className="text-[10px] text-[var(--color-text-muted)] truncate font-mono px-1" title={value}>
          {value}
        </p>
      )}
    </div>
  );
}
