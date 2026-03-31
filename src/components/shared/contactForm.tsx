"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import type { ContactFormData } from "@/lib/types";

const SUBJECTS = [
  "Order inquiry",
  "Product question",
  "Returns & exchanges",
  "Shipping & delivery",
  "Press & collaborations",
  "Other",
];

const INITIAL: ContactFormData = {
  firstName: "", lastName: "", email: "",
  subject: "", message: "", orderNumber: "",
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

function validate(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim())  errors.lastName  = "Last name is required.";
  if (!data.email.trim())     errors.email     = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.subject)          errors.subject   = "Please select a subject.";
  if (!data.message.trim())   errors.message   = "Message is required.";
  else if (data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

export function ContactForm() {
  const [form,        setForm]        = useState<ContactFormData>(INITIAL);
  const [errors,      setErrors]      = useState<FieldErrors>({});
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setServerError(null);
    if (errors[name as keyof ContactFormData]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstInvalid = document.querySelector("[aria-invalid='true']") as HTMLElement | null;
      firstInvalid?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Network error — please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-12" role="status" aria-live="polite">
        <div className="w-14 h-14 bg-success-light rounded-full flex items-center justify-center">
          <CheckCircle size={24} className="text-success" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-ink-soft mb-2">Message sent!</h3>
          <p className="text-sm text-ink-muted max-w-xs">
            Thanks for reaching out,{" "}
            <strong className="font-medium text-ink-soft">{form.firstName}</strong>.
            We'll reply to{" "}
            <strong className="font-medium text-ink-soft">{form.email}</strong>{" "}
            within one business day.
          </p>
        </div>
        <button
          onClick={() => { setForm(INITIAL); setSubmitted(false); setErrors({}); }}
          className="btn-secondary text-sm mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" id="firstName" name="firstName"
          value={form.firstName} onChange={handleChange}
          error={errors.firstName} required autoComplete="given-name" />
        <Field label="Last name" id="lastName" name="lastName"
          value={form.lastName} onChange={handleChange}
          error={errors.lastName} required autoComplete="family-name" />
      </div>

      {/* Email */}
      <Field label="Email address" id="email" name="email" type="email"
        value={form.email} onChange={handleChange}
        error={errors.email} required autoComplete="email" />

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="field-label">
          Subject <span aria-hidden className="text-error">*</span>
        </label>
        <select id="subject" name="subject" value={form.subject}
          onChange={handleChange} required
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={!!errors.subject}
          className={errors.subject ? "border-error focus:border-error" : ""}>
          <option value="" disabled>Select a subject…</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <FieldError id="subject-error" msg={errors.subject} />}
      </div>

      {/* Order number (optional) */}
      <Field 
        label="Order number (optional)" 
        id="orderNumber" 
        name="orderNumber"
        value={form.orderNumber ?? ""} 
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          handleChange(e);
        }}
        placeholder="#CARPA-00000" 
      />

      {/* Message */}
      <div>
        <label htmlFor="message" className="field-label">
          Message <span aria-hidden className="text-error">*</span>
        </label>
        <textarea id="message" name="message" value={form.message}
          onChange={handleChange} rows={5} required
          placeholder="Tell us how we can help…"
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          aria-invalid={!!errors.message}
          className={`resize-y ${errors.message ? "border-error focus:border-error" : ""}`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.message
            ? <FieldError id="message-error" msg={errors.message} />
            : <span id="message-hint" />}
          <span
            className={`text-xs tabular-nums ${
              form.message.length === 0 ? "text-ink-ghost"
              : form.message.length < 20 ? "text-warning"
              : "text-success"
            }`}
            aria-live="polite"
          >
            {form.message.length} / 20 min
          </span>
        </div>
      </div>

      {/* Server error banner */}
      {serverError && (
        <div className="flex items-start gap-3 p-4 bg-error-light border border-error/30 rounded"
          role="alert" aria-live="assertive">
          <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm text-error leading-relaxed">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={submitting}
        className="btn-primary self-start flex items-center gap-2.5 mt-1"
        aria-busy={submitting}>
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-ink-ghost">
        By submitting, you agree to our{" "}
        <a href="/policies/privacy" className="underline hover:text-accent transition-colors">
          Privacy Policy
        </a>.
      </p>
    </form>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label:  string;
  id:     string;
  error?: string | undefined;
}

function Field({ label, id, name, error, required, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden className="text-error ml-0.5">*</span>}
      </label>
      <input id={id} name={name} required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={error ? "border-error focus:border-error" : ""}
        {...rest}
      />
      {error && <FieldError id={`${id}-error`} msg={error} />}
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} role="alert" className="text-xs text-error mt-1.5 flex items-center gap-1">
      <AlertCircle size={11} aria-hidden />
      {msg}
    </p>
  );
}
