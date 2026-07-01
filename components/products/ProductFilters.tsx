'use client';

import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button, Combobox, NumberInput, Select } from 'chiselui';
import type { ComboboxOption, SelectOption } from 'chiselui';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { PRICE_BOUNDS, type ProductFilterCriteria } from '@/lib/filter-products';
import type { ProductCategory } from '@/lib/types';
import styles from './ProductFilters.module.css';

/** "All Categories" reset option followed by the four real categories. */
const CATEGORY_OPTIONS: SelectOption[] = [
  { value: '', label: 'All Categories' },
  ...categories.map((category) => ({ value: category.slug, label: category.label })),
];

/** Debounce a callback so rapid updates (typing a price) collapse into one call. */
function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(
    () => () => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
    },
    [],
  );

  return useCallback(
    (...args: A) => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay],
  );
}

export interface ProductFiltersProps {
  /** Current filter values, parsed from the URL by the parent. */
  filters: ProductFilterCriteria;
  /** Merge a partial change into the active filters (the parent resets to page 1). */
  onChange: (patch: Partial<ProductFilterCriteria>) => void;
  /** Reset every filter back to its default. */
  onClear: () => void;
  /** Whether any filter is currently narrowing the results. */
  hasActiveFilters: boolean;
}

/**
 * The filter bar for the products listing: category, price range and search.
 * Controls are controlled by the URL-derived `filters`; every change is pushed
 * up via `onChange`, keeping the parent the single owner of the URL.
 *
 * Price inputs keep local state and debounce their upward push so stepping or
 * typing doesn't spam the router; the category and search controls fire
 * immediately since they change in discrete, deliberate steps.
 */
export function ProductFilters({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
}: ProductFiltersProps) {
  const [open, setOpen] = useState(false);

  const minValue = filters.minPrice ?? PRICE_BOUNDS.min;
  const maxValue = filters.maxPrice ?? PRICE_BOUNDS.max;

  // Local mirror of the price inputs so typing feels instant while the URL
  // update is debounced. Re-sync whenever the filters change from the outside
  // (e.g. "Clear filters" or browser back/forward).
  const [minInput, setMinInput] = useState(minValue);
  const [maxInput, setMaxInput] = useState(maxValue);
  useEffect(() => {
    setMinInput(minValue);
  }, [minValue]);
  useEffect(() => {
    setMaxInput(maxValue);
  }, [maxValue]);

  const debouncedChange = useDebouncedCallback(onChange, 350);

  // Search suggestions: every product name plus every tag, de-duplicated. The
  // Combobox is a filterable single-select rather than a free-text field, so we
  // surface the catalog's own vocabulary as pickable options.
  const searchOptions = useMemo<ComboboxOption[]>(() => {
    const seen = new Set<string>();
    for (const product of products) {
      seen.add(product.name);
      for (const tag of product.tags) seen.add(tag);
    }
    return Array.from(seen)
      .sort((a, b) => a.localeCompare(b))
      .map((term) => ({ value: term, label: term }));
  }, []);

  const handleCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      onChange({ category: value ? (value as ProductCategory) : undefined });
    },
    [onChange],
  );

  const handleMin = useCallback(
    (value: number) => {
      setMinInput(value);
      // A min at the floor is "no minimum" — drop it from the URL.
      debouncedChange({ minPrice: value <= PRICE_BOUNDS.min ? undefined : value });
    },
    [debouncedChange],
  );

  const handleMax = useCallback(
    (value: number) => {
      setMaxInput(value);
      // A max at the ceiling is "no maximum" — drop it from the URL.
      debouncedChange({ maxPrice: value >= PRICE_BOUNDS.max ? undefined : value });
    },
    [debouncedChange],
  );

  const handleSearch = useCallback(
    (value: string) => {
      onChange({ search: value || undefined });
    },
    [onChange],
  );

  return (
    <section className={styles.filters} aria-label="Product filters">
      <div className={styles.bar}>
        <Button
          variant="secondary"
          size="md"
          className={styles.toggle}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          leftIcon={<Filter size={16} aria-hidden />}
        >
          Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="md"
            onClick={onClear}
            leftIcon={<X size={16} aria-hidden />}
          >
            Clear filters
          </Button>
        )}
      </div>

      <div className={`${styles.fields} ${open ? styles.fieldsOpen : ''}`}>
        <div className={styles.field}>
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            value={filters.category ?? ''}
            onChange={handleCategory}
          />
        </div>

        <div className={styles.priceGroup}>
          <NumberInput
            label="Min price"
            format="currency"
            currency="USD"
            locale="en-US"
            step={5}
            min={PRICE_BOUNDS.min}
            max={maxValue}
            value={minInput}
            onChange={handleMin}
          />
          <NumberInput
            label="Max price"
            format="currency"
            currency="USD"
            locale="en-US"
            step={5}
            min={minValue}
            max={PRICE_BOUNDS.max}
            value={maxInput}
            onChange={handleMax}
          />
        </div>

        <div className={styles.field}>
          <Combobox
            label="Search"
            placeholder="Search products or tags…"
            options={searchOptions}
            value={filters.search ?? ''}
            onChange={handleSearch}
          />
        </div>
      </div>
    </section>
  );
}
