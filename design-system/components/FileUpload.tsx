'use client';
/**
 * design-system/components/FileUpload.tsx
 * Qeltrava AI Design System – FileUpload
 *
 * Fully functional file uploader supporting drag-and-drop, format/size validations,
 * preview listing with delete bindings, and custom styled states.
 */
import React, { useRef, useState } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import { Button } from './Button';
import type { BaseComponentProps } from '../types';

export type FileUploadVariant = 'compact' | 'full' | 'dropzone';

export interface FileUploadProps extends BaseComponentProps {
  /** Callback triggered when selected files change */
  onChange?:         (files: File[]) => void;
  /** Accept file types list, e.g. ['image/png', 'application/pdf'] */
  accept?:           string[];
  /** Maximum file size in bytes. Default is 5MB */
  maxSize?:          number;
  /** Allow selecting multiple files. Default is false */
  multiple?:         boolean;
  /** Visual variant type. Default is 'dropzone' */
  variant?:          FileUploadVariant;
  /** Instruction / helper text below title */
  helperText?:       string;
  /** Placeholder title inside dropzone */
  title?:            string;
  /** Whether the field is disabled. Default is false */
  disabled?:         boolean;
}

export function FileUpload({
  onChange,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  variant = 'dropzone',
  helperText,
  title = 'Drag & drop files here or click to browse',
  disabled = false,
  className,
  'data-testid': testId,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList): File[] => {
    const validFiles: File[] = [];
    setError(null);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]!;

      // Validate size
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds the maximum size of ${(maxSize / (1024 * 1024)).toFixed(0)}MB.`);
        continue;
      }

      // Validate format
      if (accept && accept.length > 0) {
        const isMatched = accept.some((type) => {
          if (type.endsWith('/*')) {
            const prefix = type.split('/')[0];
            return file.type.startsWith(prefix + '/');
          }
          return file.type === type || file.name.endsWith(type);
        });

        if (!isMatched) {
          setError(`File "${file.name}" has an unsupported format.`);
          continue;
        }
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleFilesAdded = (added: FileList) => {
    if (disabled) return;
    const validated = validateFiles(added);
    if (validated.length === 0) return;

    let updatedFiles: File[];
    if (multiple) {
      updatedFiles = [...files, ...validated];
    } else {
      updatedFiles = [validated[0]!];
    }

    setFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (disabled) return;
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onChange) onChange(updated);
  };

  const acceptedString = accept ? accept.join(',') : undefined;

  // ─── Compact Variant ───
  if (variant === 'compact') {
    return (
      <div className={cn('space-y-[var(--space-2)]', className)} data-testid={testId}>
        <div className="flex items-center gap-[var(--space-3)]">
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedString}
            multiple={multiple}
            disabled={disabled}
            onChange={handleFileInputChange}
            className="hidden"
            id="compact-file-input"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleButtonClick}
            disabled={disabled}
            leftIcon={<Icon name="Upload" size={14} />}
          >
            Upload File
          </Button>
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">
            {helperText || `Max size ${(maxSize / (1024 * 1024)).toFixed(0)}MB`}
          </span>
        </div>

        {error && (
          <p className="text-[var(--font-size-xs)] text-[var(--color-status-danger)] font-medium">
            {error}
          </p>
        )}

        {files.length > 0 && (
          <ul className="space-y-1">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-[var(--font-size-xs)] text-[var(--color-text-secondary)] py-1 border-b border-[var(--color-border)]"
              >
                <span className="truncate max-w-[200px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-[var(--color-status-danger)] hover:underline"
                  disabled={disabled}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // ─── Dropzone and Full Variants ───
  return (
    <div className={cn('w-full space-y-[var(--space-3)]', className)} data-testid={testId}>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        role="presentation"
        className={cn(
          'w-full flex flex-col items-center justify-center border-2 border-dashed rounded-[var(--radius-xl)] cursor-pointer text-center select-none transition-all duration-150',
          variant === 'full' ? 'p-[var(--space-12)]' : 'p-[var(--space-8)]',
          dragActive
            ? 'border-[var(--color-accent)] bg-[var(--color-status-info-bg)]/20'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] bg-[var(--surface-1)]',
          disabled && 'opacity-50 cursor-not-allowed hover:border-[var(--color-border)]'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedString}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-[var(--space-3)]">
          <span className={cn('p-3 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]', dragActive && 'text-[var(--color-accent)] bg-[var(--color-status-info-bg)]')}>
            <Icon name="UploadCloud" size={24} />
          </span>
          <div className="space-y-1">
            <p className="font-semibold text-[var(--font-size-sm)] text-[var(--color-text)]">
              {title}
            </p>
            <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
              {helperText || `Supports standard files up to ${(maxSize / (1024 * 1024)).toFixed(0)}MB`}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-[var(--font-size-xs)] text-[var(--color-status-danger)] font-medium">
          {error}
        </p>
      )}

      {/* Uploaded Files Preview List */}
      {files.length > 0 && (
        <ul className="border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-1)] divide-y divide-[var(--color-border)]">
          {files.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-[var(--space-3)] text-[var(--font-size-sm)]"
            >
              <div className="flex items-center gap-[var(--space-3)] min-w-0">
                <span className="text-[var(--color-text-tertiary)] shrink-0">
                  <Icon name="File" size={16} />
                </span>
                <div className="min-w-0">
                  <p className="font-medium truncate text-[var(--color-text)] leading-tight">{file.name}</p>
                  <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(idx)}
                className="p-1 rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-status-danger)] hover:bg-[var(--color-bg-hover)] transition-all focus:outline-none focus:ring-1 focus:ring-[var(--focus-ring-color)]"
                aria-label={`Remove file ${file.name}`}
                disabled={disabled}
              >
                <Icon name="Trash2" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default FileUpload;
