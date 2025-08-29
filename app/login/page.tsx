// app/login/page.tsx
export default async function Login(props: PageProps<'/login'>) {
  const query = await props.searchParams;
  const next = typeof query.next === 'string' ? query.next : '/';
  const hasError = typeof query.error === 'string';

  return (
    <div className="max-w-md">
      <h1 className="text-lg font-semibold mb-4">Sign in</h1>
      {hasError && <p className="mb-3 text-sm text-red-500">Invalid email or password.</p>}
      <form action="/api/login" method="post" className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input id="password" name="password" type="password" required className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <button className="rounded-md px-4 py-2 bg-black/20">Sign in</button>
      </form>
      <p className="mt-3 text-xs text-slate-400">
        Use admin@fms.local / ChangeMe!123 (from your seed). Change it later.
      </p>
    </div>
  );
}
