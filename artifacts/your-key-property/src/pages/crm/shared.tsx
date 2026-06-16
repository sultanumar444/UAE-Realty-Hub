import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  getListListingsQueryKey,
  getListLeadsQueryKey,
  getListAgentsQueryKey,
  getListPostsQueryKey,
} from "@workspace/api-client-react";

export function useCrmInvalidate() {
  const qc = useQueryClient();
  return useCallback(
    (kind: "listings" | "leads" | "agents" | "posts") => {
      const key =
        kind === "listings"
          ? getListListingsQueryKey()
          : kind === "leads"
            ? getListLeadsQueryKey()
            : kind === "agents"
              ? getListAgentsQueryKey()
              : getListPostsQueryKey();
      qc.invalidateQueries({ queryKey: [key[0]] });
    },
    [qc],
  );
}

export function formatAed(value: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-white/60">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#C9974C] focus:outline-none focus:ring-1 focus:ring-[#C9974C]";

export const selectClass = `${inputClass} appearance-none`;
