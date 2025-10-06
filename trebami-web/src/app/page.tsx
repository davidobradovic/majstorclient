'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
// Removed unused imports for cleaner code

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  // Clean, professional homepage without unnecessary data arrays

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Trebami</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Usluge</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Partneri</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">O nama</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Kontakt</a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/auth/login')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Prijavi se
              </button>
              <button 
                onClick={() => router.push('/auth/register')}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Registruj se
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Profesionalna
              <span className="block text-blue-600">Platforma Usluga</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Povezujemo vas sa verifikovanim majstorima za sve vaše potrebe. 
              Kvalitet zagarantovan, transparentne cene, besprekorno iskustvo.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => router.push('/auth/register?role=user')}
                className="bg-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Počni sada
              </button>
              <button 
                onClick={() => router.push('/auth/register?role=worker')}
                className="border-2 border-gray-300 text-gray-700 px-12 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Postani majstor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kategorije Usluga</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionalne usluge u svim glavnim kategorijama
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kućne usluge */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kućne usluge</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Čišćenje</li>
                <li>Električar</li>
                <li>Vodoinstalater</li>
                <li>Klima servis</li>
                <li>Moljac</li>
              </ul>
            </div>

            {/* Gradnja i renoviranje */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gradnja i renoviranje</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Renoviranje</li>
                <li>Farbanje</li>
                <li>Parket</li>
                <li>Krov</li>
                <li>Kuhinja i kupatilo</li>
              </ul>
            </div>

            {/* IT i tehnologija */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IT i tehnologija</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Računari</li>
                <li>Mreža</li>
                <li>Softver</li>
                <li>Web dizajn</li>
                <li>Mobilni telefoni</li>
              </ul>
            </div>

            {/* Održavanje i servis */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Održavanje i servis</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Bela tehnika</li>
                <li>Automobili</li>
                <li>Bicikli</li>
                <li>Ogrjev</li>
                <li>Opšte održavanje</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Apps Section */}
      <div className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Preuzmite našu mobilnu aplikaciju</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Pristupite profesionalnim uslugama u pokretu. Rezervišite, pratite i upravljajte 
                svojim uslugama sa našom intuitivnom mobilnom aplikacijom.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://play.google.com/store" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Google Play" 
                    className="h-8"
                  />
                </a>
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="App Store" 
                    className="h-8"
                  />
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-80 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-8xl">📱</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">O Trebami</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Mi smo profesionalna tržišna platforma koja povezuje kupce sa verifikovanim 
                majstorima u svim glavnim kategorijama usluga. Naša platforma osigurava 
                kvalitet, transparentnost i besprekorno iskustvo za pružaoce usluga i kupce.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Samo verifikovani majstori</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Transparentne cene</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Kvalitet zagarantovan</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-6xl">🏢</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professionals Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-6xl">👨‍🔧</div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Pridružite se našoj mreži majstora</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Postanite deo naše verifikovane mreže majstora i počnite da zarađujete sa Trebami. 
                Postavite svoj raspored, birajte svoje usluge i gradite svoj biznis uz 
                našu podršku i tehnologiju.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Fleksibilno zakazivanje</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Konkurentne cene</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Profesionalna podrška</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Zašto izabrati Trebami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionalna platforma usluga izgrađena za moderne potrebe
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Napredna tehnologija</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Gradimo tehnologiju koja pokreće budućnost usluga. Naš tim inženjera 
                kreira inovativna rešenja koja besprekorno povezuju kupce sa majstorima.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Društveni uticaj</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Posvećeni smo stvaranju pozitivnog društvenog i ekonomskog uticaja u zajednicama 
                kojima služimo, osnažujući majstore i poboljšavajući pristup kvalitetnim uslugama.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Najnoviji uvidi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Budite u toku sa trendovima u industriji i najboljim praksama
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-4xl">🏠</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kako odabrati pravog majstora</h3>
                <p className="text-gray-600 mb-4">Saznajte kako Trebami pomaže da pronađete pouzdane majstore za sve vaše kućne potrebe.</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Pročitaj više →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-4xl">💰</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparentne cene i pogodnosti</h3>
                <p className="text-gray-600 mb-4">Saznajte više o našim transparentnim cenama i ekskluzivnim članskim pogodnostima.</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Pročitaj više →</a>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-4xl">⚡</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Brze i pouzdane usluge</h3>
                <p className="text-gray-600 mb-4">Kako Trebami pomaže da brzo pronađete kvalitetne usluge u vašoj okolini.</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Pročitaj više →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo */}
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="h-8 w-8 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-2xl font-bold">Trebami</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Profesionalna platforma usluga koja povezuje kupce sa verifikovanim majstorima.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
            
            {/* Usluge */}
            <div>
              <h3 className="font-semibold mb-4">Usluge</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Kućne usluge</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gradnja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tehnologija</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Održavanje</a></li>
              </ul>
            </div>
            
            {/* Kompanija */}
            <div>
              <h3 className="font-semibold mb-4">Kompanija</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">O nama</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karijere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Novosti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            
            {/* Podrška */}
            <div>
              <h3 className="font-semibold mb-4">Podrška</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centar za pomoć</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politika privatnosti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Uslovi korišćenja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bezbednost</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 Trebami. Sva prava zadržana.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-sm text-gray-400">Srpski</span>
                <span className="text-sm text-gray-400">Srbija</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}