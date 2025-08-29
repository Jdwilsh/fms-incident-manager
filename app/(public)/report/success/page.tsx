export default async function Success(props: PageProps<'/report/success'>) {
  const search = await props.searchParams;
  const ref = typeof search.ref === 'string' ? search.ref : undefined;

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">Incident submitted</h1>
      {ref && <p>Reference: <strong>{ref}</strong></p>}
      <p>Thank you. An investigating manager will review this.</p>
    </div>
  );
}
