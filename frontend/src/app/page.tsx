'use client';
import { useState } from 'react';
import Head from 'next/head';

const themes = ['Monokai', 'Dracula', 'Nord', 'Solarized', 'One Dark'];
const languages = ['JavaScript', 'Python', 'Rust', 'TypeScript', 'Go'];

export default function Home() {
  const [code, setCode] = useState('fn main() {\n    println!("Hello, World!");\n}');
  const [theme, setTheme] = useState('Monokai');
  const [lang, setLang] = useState('Rust');

  return (
    <>
      <Head><title>Carbon - Code Artwork</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Carbon</h1>
            <p className="text-gray-400 text-xl">Turn code into artwork</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <textarea value={code} onChange={e => setCode(e.target.value)} className="w-full h-80 bg-gray-950 border border-gray-700 rounded-xl p-4 font-mono text-green-400 resize-none focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Theme</label>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                  {themes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Language</label>
                <select value={lang} onChange={e => setLang(e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                  {languages.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <button className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl">Generate Image</button>
            </div>
          </div>
          <div className="mt-8 bg-gray-950 rounded-xl p-8 border border-gray-800">
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">{code}</pre>
          </div>
        </div>
      </main>
    </>
  );
}
