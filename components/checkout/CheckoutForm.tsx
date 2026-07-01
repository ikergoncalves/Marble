'use client';

import { useState, type FormEvent } from 'react';
import { CreditCard, Info, Lock } from 'lucide-react';
import { Button, FileUpload, Input, Select, type FileUploadFile } from 'chiselui';
import styles from './CheckoutForm.module.css';

export interface CheckoutFormProps {
  /**
   * Fired once the form passes validation and the (simulated) processing delay
   * has elapsed. The parent owns what happens next — generating the order,
   * clearing the cart and opening the confirmation modal.
   */
  onOrderPlaced: (details: { email: string }) => void;
}

/** The plain string fields of the form (everything except the file upload). */
interface FormValues {
  email: string;
  fullName: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: FormValues = {
  email: '',
  fullName: '',
  country: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
};

/**
 * Billing countries offered for the invoice. A short, representative list is
 * plenty for a mocked storefront — the value is a plain string carried into the
 * confirmation, not validated against anything real.
 */
const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'BR', label: 'Brazil' },
  { value: 'PT', label: 'Portugal' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'ES', label: 'Spain' },
  { value: 'AU', label: 'Australia' },
  { value: 'JP', label: 'Japan' },
];

/** Optional proof-of-purchase upload limits. */
const PROOF_ACCEPT = 'image/*,.pdf';
const PROOF_MAX_SIZE = 5 * 1024 * 1024; // 5 MB

/** How long the fake "processing" spinner runs before confirming the order. */
const PROCESSING_MS = 1200;

/**
 * The checkout form: contact details, billing country, mocked card fields and an
 * optional proof-of-purchase upload. All validation is intentionally lightweight
 * (presence + a basic `@` check on the email) because this is a portfolio
 * storefront with no real payment processing.
 *
 * Must be a Client Component: it holds form state and renders chiselui's stateful
 * `Input`, `Select` and `FileUpload`. See the project's "createContext" note —
 * anything importing chiselui's barrel has to live in a client tree.
 */
export function CheckoutForm({ onOrderPlaced }: CheckoutFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [proof, setProof] = useState<FileUploadFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  /** Update one field and clear any error it was showing. */
  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  /** Returns the field→message map for whatever is currently invalid. */
  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.email.trim()) {
      next.email = 'Email is required.';
    } else if (!values.email.includes('@')) {
      next.email = 'Enter a valid email address.';
    }
    if (!values.fullName.trim()) next.fullName = 'Full name is required.';
    if (!values.country) next.country = 'Select a billing country.';
    if (!values.cardNumber.trim()) next.cardNumber = 'Card number is required.';
    if (!values.cardExpiry.trim()) next.cardExpiry = 'Expiry date is required.';
    if (!values.cardCvv.trim()) next.cardCvv = 'CVV is required.';
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Simulate payment processing so the loading state feels real, then hand off
    // to the parent. No cleanup on unmount is needed: once the order is placed
    // the parent clears the cart and this form is unmounted.
    setSubmitting(true);
    window.setTimeout(() => {
      onOrderPlaced({ email: values.email.trim() });
    }, PROCESSING_MS);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.section} disabled={submitting}>
        <legend className={styles.legend}>Contact information</legend>
        <p className={styles.sectionHint}>Your receipt and download links are sent here.</p>
        <div className={styles.grid}>
          <Input
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            error={errors.email}
            onChange={(event) => setField('email', event.target.value)}
          />
          <Input
            label="Full name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={values.fullName}
            error={errors.fullName}
            onChange={(event) => setField('fullName', event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section} disabled={submitting}>
        <legend className={styles.legend}>Billing details</legend>
        <p className={styles.sectionHint}>
          These are digital downloads, so we only need a country for your invoice — no shipping
          address required.
        </p>
        <Select
          label="Billing country"
          placeholder="Select a country"
          options={COUNTRY_OPTIONS}
          value={values.country}
          error={errors.country}
          onChange={(event) => setField('country', event.target.value)}
        />
      </fieldset>

      <fieldset className={styles.section} disabled={submitting}>
        <legend className={styles.legend}>Payment</legend>
        <p className={styles.demoNote}>
          <Info size={15} aria-hidden />
          This is a demo checkout — no real payment is processed.
        </p>
        <div className={styles.grid}>
          <div className={styles.spanFull}>
            <Input
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              leftAddon={<CreditCard size={16} aria-hidden />}
              value={values.cardNumber}
              error={errors.cardNumber}
              onChange={(event) => setField('cardNumber', event.target.value)}
            />
          </div>
          <Input
            label="Expiry date"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={values.cardExpiry}
            error={errors.cardExpiry}
            onChange={(event) => setField('cardExpiry', event.target.value)}
          />
          <Input
            label="CVV"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            leftAddon={<Lock size={16} aria-hidden />}
            value={values.cardCvv}
            error={errors.cardCvv}
            onChange={(event) => setField('cardCvv', event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className={styles.section} disabled={submitting}>
        <legend className={styles.legend}>Proof of purchase (optional)</legend>
        <p className={styles.sectionHint}>
          Paying by bank transfer or PIX? Attach a receipt and we&apos;ll match it to your order.
          Images and PDF, up to 5&nbsp;MB.
        </p>
        <FileUpload
          value={proof}
          onChange={setProof}
          accept={PROOF_ACCEPT}
          multiple={false}
          maxFiles={1}
          maxSize={PROOF_MAX_SIZE}
          hint="Drag a receipt here or click to browse"
        />
      </fieldset>

      <Button type="submit" variant="primary" size="lg" loading={submitting} className={styles.submit}>
        {submitting ? 'Processing…' : 'Place order'}
      </Button>
    </form>
  );
}
