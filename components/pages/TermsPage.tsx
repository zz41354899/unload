import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { BatteryWarning, GitMerge, FileText, Smile } from 'lucide-react';

export const TermsPage = () => (
  <div className="pt-32 pb-20 min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <span className="text-secondary-accent text-xs tracking-[0.2em] uppercase block mb-4">TERMS</span>
        <h1 className="text-3xl font-light text-primary mb-8">平台使用約定</h1>

        <div className="space-y-10 text-primary-light font-light leading-loose border-t border-secondary-light pt-10">
          <p className="text-lg text-primary font-normal">
            歡迎來到 Unload。在使用本服務前，請先閱讀以下約定。我們希望建立一個基於互信、尊重與安全的內在探索環境。
          </p>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-2">
                <BatteryWarning className="w-4 h-4 text-secondary-accent" />
                這不是醫療服務 (Non-Medical)
              </h3>
              <p className="text-sm">
                Unload 可被視為一面協助觀察自身狀態的「鏡子」，而非「醫生」。介面與文字僅提供心理學相關的引導與反思架構，<strong>不構成專業醫療診斷、諮商或治療</strong>。若身心狀態感到難以負荷，建議直接尋求合格醫師或心理師的協助。
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-secondary-accent" />
                Beta 實驗計畫 (Beta Phase)
              </h3>
              <p className="text-sm">
                目前本服務處於實驗與開發階段。這意味著功能可能會調整，偶爾可能會發生不穩定的狀況。我們感謝您的包容與回饋，這將幫助打造更完善的正式版本。
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-secondary-accent" />
                內容歸屬 (Ownership)
              </h3>
              <p className="text-sm">
                簡單來說：<strong>平台屬於我們，故事屬於使用者。</strong>
                <br />
                Unload 的介面設計與程式碼歸平台所有；但在日記中寫下的每一個字、每一段反思，其智慧財產權完全歸個人所有。
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-2">
                <Smile className="w-4 h-4 text-secondary-accent" />
                友善使用 (Respect)
              </h3>
              <p className="text-sm">
                使用本工具時，假設所有參與者都在盡力照顧自己。請避免破壞系統安全或進行任何非法行為；若發生明顯違規，平台保有調整或終止服務的彈性空間。
              </p>
            </section>
          </div>

          <div className="text-sm text-primary-light/60 mt-12 pt-8 border-t border-secondary-light/30">
            最後更新日期：2025 年 11 月 01 日
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
);
