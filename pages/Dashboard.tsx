
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { ResponsibilityOwner, TaskWorry, TaskPolarity } from '../types';
import { Smile, MessageSquare, Book, TrendingUp, Zap, Target, Brain, Lightbulb, Sparkles, ChevronDown } from 'lucide-react';
import { getDailyQuote } from '../lib/quotes';

interface DashboardProps {
  navigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const { tasks, user } = useAppStore();
  const { t, i18n } = useTranslation();

  const [polarityFilter, setPolarityFilter] = React.useState<'all' | 'positive' | 'negative'>('all');

  // Date Helper
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthLabel = today.toLocaleString(i18n.language, { month: 'long' });

  const filteredTasks = React.useMemo(
    () =>
      tasks.filter(task => {
        if (!polarityFilter || polarityFilter === 'all') return true;
        const effectivePolarity = task.polarity ?? TaskPolarity.Negative;
        return effectivePolarity === polarityFilter;
      }),
    [tasks, polarityFilter],
  );

  const totalTasks = filteredTasks.length;
  const myTasks = filteredTasks.filter(t => t.owner === ResponsibilityOwner.Mine).length;
  const theirTasks = filteredTasks.filter(t => t.owner === ResponsibilityOwner.Theirs).length;
  const sharedTasks = filteredTasks.filter(t => t.owner === ResponsibilityOwner.Shared).length;

  const hasFilteredTasks = filteredTasks.length > 0;
  const avgControl = hasFilteredTasks
    ? Math.round(filteredTasks.reduce((sum, t) => sum + t.controlLevel, 0) / filteredTasks.length)
    : 0;

  // Get top worries
  const getTopWorries = () => {
    if (filteredTasks.length === 0) return [];

    const counts: Record<string, number> = {};
    filteredTasks.forEach(t => {
      const worries = Array.isArray(t.worry) ? t.worry : [t.worry];
      worries.forEach(worry => {
        counts[worry] = (counts[worry] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  };

  const topWorries = getTopWorries();

  const getWorryLabel = (worry: string, isPositive: boolean) => {
    const keyFor = (suffix: string) => {
      if (isPositive) {
        const positiveKey = `taskWorryPositive.${suffix}`;
        const positiveLabel = t(positiveKey);
        if (positiveLabel !== positiveKey) {
          return positiveLabel;
        }
      }

      const defaultKey = `taskWorry.${suffix}`;
      const defaultLabel = t(defaultKey);
      return defaultLabel !== defaultKey ? defaultLabel : suffix;
    };

    switch (worry) {
      case TaskWorry.Performance: return keyFor('Performance');
      case TaskWorry.Rejection: return keyFor('Rejection');
      case TaskWorry.OthersThoughts: return keyFor('OthersThoughts');
      case TaskWorry.Pressure: return keyFor('Pressure');
      case TaskWorry.Comparison: return keyFor('Comparison');
      case TaskWorry.TimeStress: return keyFor('TimeStress');
      case TaskWorry.Decision: return keyFor('Decision');
      case TaskWorry.Uncertainty: return keyFor('Uncertainty');
      case TaskWorry.Other: return keyFor('Other');
      default: return worry;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0">

      {/* Header Section */}
      <div className="bg-white rounded-2xl p-4 md:p-12 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{t('dashboard.header.title')}</h1>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">{t('dashboard.header.subtitle')}</p>
          </div>
          <div className="text-right hidden md:block shrink-0">
            <div className="text-3xl font-bold text-primary/20">{currentYear}</div>
            <div className="text-xl font-medium text-primary/40">{currentMonthLabel}</div>
          </div>
        </div>
        <button
          onClick={() => navigate('new-task')}
          className="w-full md:w-auto bg-primary text-white px-6 md:px-8 py-3 rounded-full hover:bg-[#1e2b1e] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 text-sm md:text-base font-medium"
        >
          {t('dashboard.header.cta')}
        </button>
      </div>

      {/* Daily Quote */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-3 md:p-8 border border-primary/20 shadow-sm">
        <div className="flex items-start gap-3 md:gap-4">
          <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-primary shrink-0 mt-0.5 md:mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-primary/60 font-medium mb-1 md:mb-2">{t('journal.dailyQuote.title')}</p>
            <p className="text-sm md:text-lg leading-relaxed text-text font-medium break-words">
              "{getDailyQuote()}"
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: t('dashboard.stats.total'), value: totalTasks, icon: TrendingUp },
          { label: t('dashboard.stats.mine'), value: myTasks, icon: Book },
          { label: t('dashboard.stats.theirs'), value: theirTasks, icon: MessageSquare },
          { label: t('dashboard.stats.shared'), value: sharedTasks, icon: Smile },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-3 md:p-6 rounded-2xl shadow-sm min-h-[120px] md:min-h-[160px] flex flex-col justify-between"
          >
            <stat.icon className="w-4 md:w-5 h-4 md:h-5 text-gray-400 mb-2" />
            <div>
              <div className="text-xl md:text-4xl font-bold mb-1 text-text">{stat.value}</div>
              <div className="text-[11px] md:text-sm text-gray-500 font-medium break-words">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats & Personal Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg">{t('dashboard.quick.title')}</h3>
          </div>

          {hasFilteredTasks ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                <div className="text-sm text-gray-600 mb-2">{t('dashboard.quick.avg')}</div>
                <div className="text-4xl font-bold text-primary mb-2">{avgControl}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${avgControl}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {avgControl >= 70
                  ? t('dashboard.quick.hint.high')
                  : avgControl >= 40
                    ? t('dashboard.quick.hint.mid')
                    : t('dashboard.quick.hint.low')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
              <Zap className="w-8 h-8 mb-2 opacity-20" />
              <span className="text-sm">{t('dashboard.quick.empty')}</span>
            </div>
          )}
        </div>

        {/* Personal Insights */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">{t('dashboard.insight.title')}</h3>
            </div>
            <div className="relative w-full sm:w-auto">
              <select
                value={polarityFilter}
                onChange={(e) => setPolarityFilter(e.target.value as 'all' | 'positive' | 'negative')}
                className="appearance-none w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pr-7 text-xs md:text-sm text-gray-700 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">{t('polarity.all')}</option>
                <option value="positive">{t('polarity.positive')}</option>
                <option value="negative">{t('polarity.negative')}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {(() => {
                const positiveTasks = tasks.filter(t => (t.polarity ?? TaskPolarity.Negative) === TaskPolarity.Positive);
                const negativeTasks = tasks.filter(t => (t.polarity ?? TaskPolarity.Negative) === TaskPolarity.Negative);

                const getTopFromList = (source: typeof tasks) => {
                  if (source.length === 0) return null;
                  const counts: Record<string, number> = {};
                  source.forEach(t => {
                    const worries = Array.isArray(t.worry) ? t.worry : [t.worry];
                    worries.forEach(w => {
                      counts[w] = (counts[w] || 0) + 1;
                    });
                  });
                  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                  return top ? top[0] : null;
                };

                const positiveTopWorry = getTopFromList(positiveTasks);
                const negativeTopWorry = getTopFromList(negativeTasks);

                const showPositive = polarityFilter === 'all' || polarityFilter === 'positive';
                const showNegative = polarityFilter === 'all' || polarityFilter === 'negative';

                return (
                  <>
                    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {t('dashboard.insight.distribution', { mine: myTasks, shared: sharedTasks, theirs: theirTasks })}
                      </p>
                    </div>

                    {showPositive && positiveTopWorry && (
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {t('dashboard.insight.mainHighlight', { worry: getWorryLabel(positiveTopWorry as string, true) })}
                        </p>
                      </div>
                    )}

                    {showNegative && negativeTopWorry && (
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {t('dashboard.insight.mainWorry', { worry: getWorryLabel(negativeTopWorry as string, false) })}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => navigate('journal')}
                      className="w-full mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                    >
                      {t('dashboard.insight.viewMore')}
                    </button>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
              <Brain className="w-8 h-8 mb-2 opacity-20" />
              <span className="text-sm">{t('dashboard.insight.empty')}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
