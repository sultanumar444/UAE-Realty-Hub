import { useEffect, useRef, type ReactNode } from "react";
import {
  ClerkProvider,
  SignIn,
  Show,
  useClerk,
  useUser,
} from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { dark } from "@clerk/themes";
import { useLocation, Redirect } from "wouter";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

const clerkAppearance = {
  theme: dark,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#C9974C",
    colorForeground: "#FFFFFF",
    colorMutedForeground: "rgba(255,255,255,0.65)",
    colorDanger: "#EF4444",
    colorBackground: "#0A1628",
    colorInput: "rgba(255,255,255,0.06)",
    colorInputForeground: "#FFFFFF",
    colorNeutral: "rgba(255,255,255,0.18)",
    fontFamily: "'Questrial', sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-[#0A1628] border border-[#C9974C]/30 rounded-2xl w-[440px] max-w-full overflow-hidden shadow-2xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-lg",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-lg",
    headerTitle: "text-white",
    headerSubtitle: "text-white/60",
    socialButtonsBlockButtonText: "text-white",
    formFieldLabel: "text-white/80",
    footerActionLink: "text-[#C9974C] hover:text-[#dcb069]",
    footerActionText: "text-white/60",
    dividerText: "text-white/50",
    identityPreviewEditButton: "text-[#C9974C]",
    formFieldSuccessText: "text-emerald-400",
    alertText: "text-white",
    logoBox: "justify-center",
    logoImage: "h-12 w-auto",
    socialButtonsBlockButton: "border-white/15 hover:bg-white/5 text-white",
    formButtonPrimary:
      "bg-[#C9974C] hover:bg-[#b8863b] text-[#0A1628] font-semibold",
    formFieldInput: "bg-white/5 border-white/15 text-white",
    footerAction: "",
    dividerLine: "bg-white/15",
    alert: "bg-white/5 border-white/15",
    otpCodeFieldInput: "text-white border-white/15",
    formFieldRow: "",
    main: "",
  },
};

export function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-20">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        forceRedirectUrl={`${basePath}/crm`}
      />
    </div>
  );
}

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? "")
  .trim()
  .toLowerCase();

function AdminGate({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#0A1628] text-white/60">
        Loading...
      </div>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();

  // Fail closed: without a configured admin email, no one may access the CRM.
  if (!ADMIN_EMAIL || email !== ADMIN_EMAIL) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-[#0A1628] px-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9974C]">
            Your Key
          </p>
          <h1 className="mt-2 font-serif text-3xl text-white">
            Access restricted
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            This CRM is limited to the account administrator. Please sign in with
            the administrator account.
          </p>
        </div>
        <button
          onClick={() => void signOut({ redirectUrl: `${basePath}/sign-in` })}
          className="rounded-lg bg-[#C9974C] px-5 py-2.5 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  return (
    <>
      <Show when="signed-in">
        <AdminGate>{children}</AdminGate>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

export function ClerkProviderWithRoutes({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      localization={{
        signIn: {
          start: {
            title: "Administrator sign in",
            subtitle: "Access the Your Key property CRM",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
