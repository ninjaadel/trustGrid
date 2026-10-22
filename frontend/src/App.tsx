import { useMemo, useState } from 'react';

type Space = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  updatedAt: string;
};

const initialSpaces: Space[] = [
  {
    id: '1',
    name: 'TrustGrid Academy',
    slug: 'trustgrid-academy',
    description: 'Eğitim içerikleri ve öğrenme topluluğu.',
    color: 'from-violet-500 to-indigo-600',
    updatedAt: 'Bugün güncellendi',
  },
  {
    id: '2',
    name: 'Ürün Lansmanı',
    slug: 'urun-lansmani',
    description: 'Yeni ürün için erken erişim ve duyurular.',
    color: 'from-cyan-500 to-blue-600',
    updatedAt: 'Dün güncellendi',
  },
  {
    id: '3',
    name: 'Tasarım Atölyesi',
    slug: 'tasarim-atolyesi',
    description: 'Tasarım kaynakları ve özel içerikler.',
    color: 'from-orange-400 to-rose-500',
    updatedAt: '12 Eki 2026',
  },
];

function Icon({
  name,
  className = 'size-5',
}: {
  name: 'grid' | 'plus' | 'search' | 'arrow' | 'external' | 'more' | 'close';
  className?: string;
}) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [query, setQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const visibleSpaces = useMemo(
    () =>
      spaces.filter((space) =>
        `${space.name} ${space.slug}`.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')),
      ),
    [query, spaces],
  );

  function updateName(value: string) {
    setName(value);
    setSlug(
      value
        .toLocaleLowerCase('tr')
        .replaceAll('ı', 'i')
        .replaceAll('ğ', 'g')
        .replaceAll('ü', 'u')
        .replaceAll('ş', 's')
        .replaceAll('ö', 'o')
        .replaceAll('ç', 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    );
  }

  function createSpace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSpaces((current) => [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        slug,
        description: 'Yeni alanınız için açıklama ekleyin.',
        color: 'from-emerald-400 to-teal-600',
        updatedAt: 'Az önce oluşturuldu',
      },
      ...current,
    ]);
    setName('');
    setSlug('');
    setIsCreateOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-6 lg:flex">
        <a className="flex items-center gap-3 px-2" href="#" aria-label="TrustGrid ana sayfa">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Icon name="grid" />
          </span>
          <span className="text-lg font-bold tracking-tight">trustgrid</span>
        </a>

        <div className="mt-12">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Çalışma alanı
          </p>
          <a
            className="mt-3 flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"
            href="#spaces"
          >
            <Icon name="grid" className="size-[18px]" />
            Alanlarım
            <span className="ml-auto rounded-md bg-white px-2 py-0.5 text-xs text-indigo-600">
              {spaces.length}
            </span>
          </a>
        </div>

        <div className="mt-auto rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              TG
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">TrustGrid kullanıcısı</p>
              <p className="text-xs text-slate-500">Başlangıç planı</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300">
            Planı keşfet
          </button>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Çalışma alanı</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">Alanlarım</span>
          </div>
          <button
            className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-3 text-sm font-medium transition hover:bg-slate-50"
            type="button"
          >
            <span className="grid size-7 place-items-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700">
              TG
            </span>
            <span className="hidden sm:inline">Hesabım</span>
          </button>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-indigo-600">Ürün yönetimi</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Alanlarım
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Ürünlerini, topluluklarını ve içeriklerini tek bir yerden yönet.
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              onClick={() => setIsCreateOpen(true)}
              type="button"
            >
              <Icon name="plus" className="size-[18px]" />
              Yeni alan oluştur
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-100 font-bold">i</span>
            <p>
              Önizleme modu: Alanlar şimdilik tarayıcı belleğinde tutulur; henüz backend’e kaydedilmez.
            </p>
          </div>

          <section className="mt-9" id="spaces">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">Tüm alanlar</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {spaces.length} alanın var
                </p>
              </div>
              <label className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 text-slate-400 shadow-sm sm:w-72">
                <Icon name="search" className="size-[18px]" />
                <input
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Alanlarda ara..."
                  type="search"
                  value={query}
                />
              </label>
            </div>

            {visibleSpaces.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleSpaces.map((space) => (
                  <article
                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                    key={space.id}
                  >
                    <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${space.color} p-5`}>
                      <div className="absolute -right-8 -top-14 size-48 rounded-full border border-white/20" />
                      <div className="absolute -right-2 -top-8 size-36 rounded-full border border-white/20" />
                      <div className="relative grid size-12 place-items-center rounded-2xl border border-white/30 bg-white/20 text-lg font-bold text-white backdrop-blur">
                        {space.name.slice(0, 1).toLocaleUpperCase('tr')}
                      </div>
                      <button
                        aria-label={`${space.name} seçenekleri`}
                        className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg text-white/90 transition hover:bg-white/20"
                        type="button"
                      >
                        <Icon name="more" />
                      </button>
                      <span className="absolute bottom-4 right-4 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        Aktif
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-bold">{space.name}</h3>
                          <p className="mt-1 truncate text-xs text-slate-400">trustgrid.app/p/{space.slug}</p>
                        </div>
                        <a
                          aria-label={`${space.name} alanını aç`}
                          className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"
                          href={`https://trustgrid.app/p/${space.slug}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Icon name="external" className="size-4" />
                        </a>
                      </div>
                      <p className="mt-4 min-h-10 text-sm leading-5 text-slate-500">{space.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-400">{space.updatedAt}</span>
                        <button
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition group-hover:text-indigo-700"
                          type="button"
                        >
                          Alanı yönet <Icon name="arrow" className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
                  <Icon name="search" />
                </div>
                <h3 className="mt-4 font-semibold">Alan bulunamadı</h3>
                <p className="mt-1 text-sm text-slate-500">Başka bir isim veya slug ile aramayı dene.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-20 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsCreateOpen(false);
          }}
        >
          <section
            aria-labelledby="create-space-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold" id="create-space-title">Yeni alan oluştur</h2>
                <p className="mt-1 text-sm text-slate-500">Alanına bir isim ve bağlantı seç.</p>
              </div>
              <button
                aria-label="Kapat"
                className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setIsCreateOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={createSpace}>
              <label className="block text-sm font-medium text-slate-700">
                Alan adı
                <input
                  autoFocus
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  minLength={2}
                  onChange={(event) => updateName(event.target.value)}
                  placeholder="Örn. Tasarım Atölyesi"
                  required
                  value={name}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Bağlantı adresi
                <div className="mt-2 flex h-11 items-center overflow-hidden rounded-xl border border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                  <span className="border-r border-slate-200 bg-slate-50 px-3.5 py-3 text-xs text-slate-500">trustgrid.app/p/</span>
                  <input
                    className="min-w-0 flex-1 px-3 text-sm outline-none"
                    onChange={(event) => setSlug(event.target.value)}
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    required
                    value={slug}
                  />
                </div>
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                  onClick={() => setIsCreateOpen(false)}
                  type="button"
                >
                  Vazgeç
                </button>
                <button
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={name.trim().length < 2 || !slug}
                  type="submit"
                >
                  Alan oluştur
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
