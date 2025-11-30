import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { ShieldCheck, Fingerprint, Eye } from 'lucide-react';

export const PrivacyPage = () => (
  <div className="pt-32 pb-20 min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <span className="text-secondary-accent text-xs tracking-[0.2em] uppercase block mb-4">PRIVACY</span>
        <h1 className="text-3xl font-light text-primary mb-8">隱私承諾與資料約定</h1>

        <div className="space-y-10 text-primary-light font-light leading-loose border-t border-secondary-light/40 pt-10">
          <p className="text-lg text-primary font-normal">
            在 Unload，我們深知高敏族群對「邊界」的重視。這份隱私約定不僅是規則，更是我們對保護您內在空間的承諾。
          </p>

          <div className="grid gap-8">
            <div className="bg-white p-6 rounded-lg border border-secondary-light/30 hover:border-secondary-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-secondary-accent" />
                <h3 className="text-lg font-medium text-primary">資料使用目的</h3>
              </div>
              <p className="text-sm">
                在此實驗計畫階段，所有收集之資訊<strong>僅供參與計畫做使用者回饋調整</strong>，以利優化系統體驗。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-secondary-light/50">
              <div className="flex items-center gap-3 mb-3">
                <Fingerprint className="w-5 h-5 text-secondary-accent" />
                <h3 className="text-lg font-medium text-primary">關於您的權利</h3>
              </div>
              <p className="text-sm">
                在目前的實驗階段，若不希望後續持續參與或被聯絡，可以隨時透過頁面上提供的聯絡方式告知。
                相關紀錄僅在實驗觀察與調整所需的範圍內被保留，不會被用於與本計畫無關的其他用途。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-secondary-light/50">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-secondary-accent" />
                <h3 className="text-lg font-medium text-primary">第三方規則</h3>
              </div>
              <p className="text-sm">
                除了法律強制要求外，我們絕不會將您的資料出售、交換或揭露給任何第三方廣告商或機構。這是一個封閉且安全的自我對話空間。
              </p>
            </div>
          </div>

          <div className="text-sm text-primary-light/60 mt-12 pt-8 border-t border-secondary-light/20">
            若有任何隱私疑慮，歡迎直接聯繫：
            <a href="mailto:zz41354899@gmail.com" className="border-b border-primary/10 hover:border-primary/40 hover:text-primary transition-colors">
              zz41354899@gmail.com
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
);
