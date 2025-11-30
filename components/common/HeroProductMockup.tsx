import React from 'react';
import { ArrowRight, Activity, BarChart3, BookOpen, Box, MessageCircle, Smile, Sparkles } from 'lucide-react';

export const HeroProductMockup = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 md:mt-24 px-4 perspective-1000">
      <div className="bg-background rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.01] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row min-h-[600px] bg-[#FDFCF8]">
          <div className="w-full md:w-64 bg-white p-6 flex flex-col justify-between">
            <div className="space-y-8 hidden md:block">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <span className="text-lg font-medium text-primary tracking-wide">Unload</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-secondary-accent uppercase tracking-widest mb-4 pl-3">導覽</div>
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-secondary-light/20 text-primary font-medium cursor-pointer">
                  <Box className="w-4 h-4" />
                  <span className="text-sm">儀錶板</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-light hover:bg-secondary-light/10 hover:text-primary transition-colors cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">反思日記</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-light hover:bg-secondary-light/10 hover:text-primary transition-colors cursor-pointer">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">歷史紀錄</span>
                </div>
              </div>
            </div>

            <div className="md:hidden flex justify-between items-center">
              <span className="text-lg font-medium text-primary">Unload</span>
              <div className="p-2 rounded">
                <Box className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 pt-6">
              <div className="w-8 h-8 rounded-full bg-secondary-light overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="User"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-primary">Sarah Chen</div>
                <div className="text-[10px] text-primary-light">Free Plan</div>
              </div>
              <div className="text-red-400/60 hover:text-red-400 cursor-pointer text-xs flex items-center gap-1">
                <span className="text-[10px]">登出</span>
              </div>
            </div>

            <div className="md:hidden mt-4 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary-light overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-medium text-primary">Sarah Chen</div>
              </div>
              <div className="flex items-center gap-1 text-red-400/80 text-xs">
                <ArrowRight className="w-3 h-3" />
                <span>登出</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-10 flex flex-col space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden border border-secondary-light/40 hover:border-secondary-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-primary mb-2">今日的察覺，由你決定</h3>
                  <p className="text-primary-light/80 text-sm font-light">外在的紛擾中，哪些是真正與你有關？</p>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-2xl font-light text-primary/30">2025</div>
                  <div className="text-sm text-primary/40">11月</div>
                </div>
              </div>
              <button className="bg-[#2F3E33] hover:bg-[#3A4D40] text-white text-sm px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg font-medium tracking-wide">
                開始探索發現
              </button>
            </div>

            <div className="bg-[#EBF2F0] rounded-2xl p-8 relative hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span className="text-xs font-medium text-primary/60">今日語錄</span>
              </div>
              <div className="mb-4">
                <span className="text-xs font-bold text-primary">今天想先照顧的環節：</span>
                <span className="font-bold text-primary ml-1">容易被觸發</span>
              </div>
              <p className="text-primary text-base md:text-lg font-light leading-relaxed mb-6">
                一點小事就踩到地雷，連自己也嚇一跳。
              </p>
              <div className="text-sm text-primary/70 font-light pl-3">
                今天可以試試：<span className="font-medium text-primary">神聖暫停</span> — 今天試著在回訊息或回話前，多停三秒再送出。
                <br />
                <span className="text-xs text-primary/50 mt-1 block">
                  你願意慢一點回應，本身就是在保護關係，也保護自己。
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { count: '2', label: '已記錄的探索', icon: <BarChart3 className="w-4 h-4 text-secondary-accent" /> },
                {
                  count: '1',
                  label: '聚焦於對自己的察覺',
                  icon: <BookOpen className="w-4 h-4 text-secondary-accent" />,
                },
                {
                  count: '0',
                  label: '聚焦於對他人狀態的察覺',
                  icon: <MessageCircle className="w-4 h-4 text-secondary-accent" />,
                },
                {
                  count: '1',
                  label: '聚焦於對彼此互動的察覺',
                  icon: <Smile className="w-4 h-4 text-secondary-accent" />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 flex flex-col justify-between h-32 border border-secondary-light/40 hover:border-secondary-accent/40 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-default group"
                >
                  <div className="text-secondary-accent/60 group-hover:text-secondary-accent transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-medium text-primary mb-1">{item.count}</div>
                    <div className="text-[10px] text-primary-light font-medium tracking-wide">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6 border border-secondary-light/40 hover:border-secondary-accent/40 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-primary">最常探索的情緒</span>
                </div>
                <div className="text-3xl font-medium text-primary mb-1">壓力</div>
                <div className="text-xs text-primary-light/60">在最近的記錄中出現了 1 次</div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-secondary-light/40 hover:border-secondary-accent/40 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-primary">最常使用的視角</span>
                </div>
                <div className="w-full bg-secondary-light/30 h-2 rounded-full mb-3 overflow-hidden">
                  <div className="w-[70%] bg-[#BCCBC4] h-full rounded-full" />
                </div>
                <div className="text-xs text-primary-light/80 leading-relaxed">
                  你最常從「先暫時保留這份感覺」這個視角來看待當下
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
