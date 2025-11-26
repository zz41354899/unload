
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { Search, Trash2, AlertCircle, ChevronDown, Edit2, Save, X } from 'lucide-react';
import { TaskCategory, TaskWorry, ResponsibilityOwner, TaskPolarity } from '../types';

interface HistoryProps {
  navigate: (page: string) => void;
}

export const History: React.FC<HistoryProps> = () => {
  const { tasks, deleteTask, updateTask, showToast } = useAppStore();
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReflection, setEditingReflection] = useState<string>('');
  const [editingCategories, setEditingCategories] = useState<string[]>([]);
  const [editingWorries, setEditingWorries] = useState<string[]>([]);
  const [editingOwner, setEditingOwner] = useState<string | null>(null);
  const [editingControl, setEditingControl] = useState<number>(0);
  const [editingPolarity, setEditingPolarity] = useState<TaskPolarity | null>(null);
  const [customCategory, setCustomCategory] = useState<string>('');
  const [customWorry, setCustomWorry] = useState<string>('');

  // Filter States
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [polarityFilter, setPolarityFilter] = useState<'all' | 'positive' | 'negative'>('all');

  // Helper to identify standard categories
  const standardCategories = Object.values(TaskCategory).filter(c => c !== TaskCategory.Other) as string[];

  // Filtering Logic
  const filteredTasks = tasks.filter(task => {
    // 1. Search Text
    const categories = Array.isArray(task.category) ? task.category : [task.category];
    const worries = Array.isArray(task.worry) ? task.worry : [task.worry];
    const matchesSearch =
      categories.some(cat => cat.includes(search)) ||
      worries.some(worry => worry.includes(search));
    if (!matchesSearch) return false;

    // 2. Time Filter
    if (timeFilter !== 'all') {
      const taskDate = new Date(task.date);
      const today = new Date();
      if (timeFilter === 'today') {
        if (taskDate.toDateString() !== today.toDateString()) return false;
      } else if (timeFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        if (taskDate < weekAgo) return false;
      } else if (timeFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        if (taskDate < monthAgo) return false;
      }
    }

    // 3. Category Filter
    if (categoryFilter !== 'all') {
      const taskCategories = Array.isArray(task.category) ? task.category : [task.category];
      if (categoryFilter === TaskCategory.Other) {
        // "Other" filter captures both explicit '其他' AND custom strings that aren't in standard list
        const hasNonStandard = taskCategories.some(cat => !standardCategories.includes(cat));
        if (!hasNonStandard) return false;
      } else {
        // Standard Exact Match - check if any category matches
        if (!taskCategories.includes(categoryFilter)) {
          return false;
        }
      }
    }

    // 4. Owner Filter (Task Type)
    if (ownerFilter !== 'all' && task.owner !== ownerFilter) {
      return false;
    }

    // 5. Polarity Filter
    if (polarityFilter !== 'all') {
      const effectivePolarity = task.polarity ?? TaskPolarity.Negative;
      if (effectivePolarity !== polarityFilter) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    // 6. Sort Order
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isPositiveView = polarityFilter === 'positive';

  const getCategoryLabel = (cat: string, polarity?: TaskPolarity | null) => {
    const usePositive = polarity != null ? polarity === TaskPolarity.Positive : isPositiveView;

    const keyFor = (suffix: string) => {
      if (usePositive) {
        const positiveKey = `taskCategoryPositive.${suffix}`;
        const positiveLabel = t(positiveKey);
        if (positiveLabel !== positiveKey) {
          return positiveLabel;
        }
      }

      const defaultKey = `taskCategory.${suffix}`;
      const defaultLabel = t(defaultKey);
      return defaultLabel !== defaultKey ? defaultLabel : suffix;
    };

    switch (cat) {
      case TaskCategory.Interview: return keyFor('Interview');
      case TaskCategory.CareerPlanning: return keyFor('CareerPlanning');
      case TaskCategory.SelfConfusion: return keyFor('SelfConfusion');
      case TaskCategory.ProgressAnxiety: return keyFor('ProgressAnxiety');
      case TaskCategory.ExpectationPressure: return keyFor('ExpectationPressure');
      case TaskCategory.FinancialPressure: return keyFor('FinancialPressure');
      case TaskCategory.MarketChange: return keyFor('MarketChange');
      case TaskCategory.Other: return keyFor('Other');
      default: return cat;
    }
  };

  const getWorryLabel = (w: string, polarity?: TaskPolarity | null) => {
    const usePositive = polarity != null ? polarity === TaskPolarity.Positive : isPositiveView;

    const keyFor = (suffix: string) => {
      if (usePositive) {
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

    switch (w) {
      case TaskWorry.Performance: return keyFor('Performance');
      case TaskWorry.Rejection: return keyFor('Rejection');
      case TaskWorry.OthersThoughts: return keyFor('OthersThoughts');
      case TaskWorry.Pressure: return keyFor('Pressure');
      case TaskWorry.Comparison: return keyFor('Comparison');
      case TaskWorry.TimeStress: return keyFor('TimeStress');
      case TaskWorry.Decision: return keyFor('Decision');
      case TaskWorry.Uncertainty: return keyFor('Uncertainty');
      case TaskWorry.Other: return keyFor('Other');
      default: return w;
    }
  };

  const getWorryTitle = (polarity?: TaskPolarity | null) => {
    const isPositive = polarity === TaskPolarity.Positive;
    return isPositive ? t('history.worry.highlightLabel') : t('history.worry.label');
  };

  const getOwnerLabel = (owner: string) => {
    switch (owner) {
      case ResponsibilityOwner.Mine: return t('owner.Mine');
      case ResponsibilityOwner.Theirs: return t('owner.Theirs');
      case ResponsibilityOwner.Shared: return t('owner.Shared');
      default: return owner;
    }
  };

  const getOwnerColor = (owner: string) => {
    if (owner === ResponsibilityOwner.Shared) return '#1ABC9C';
    if (owner === ResponsibilityOwner.Mine) return '#2C3E2C';
    return '#9CA3AF'; // Theirs
  };

  const handleToggleCategory = (value: string) => {
    setEditingCategories(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      setEditingCategories(prev => [...prev.filter(c => c !== TaskCategory.Other), customCategory.trim()]);
      setCustomCategory('');
    }
  };

  const handleToggleWorry = (value: string) => {
    setEditingWorries(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleAddCustomWorry = () => {
    if (customWorry.trim()) {
      setEditingWorries(prev => [...prev.filter(w => w !== TaskWorry.Other), customWorry.trim()]);
      setCustomWorry('');
    }
  };

  const handleSaveTask = (taskId: string) => {
    if (!editingOwner) {
      return;
    }

    const nextCategories = editingCategories.length === 1 ? editingCategories[0] : editingCategories;
    const nextWorries = editingWorries.length === 1 ? editingWorries[0] : editingWorries;

    updateTask(taskId, {
      category: nextCategories,
      worry: nextWorries,
      owner: editingOwner as ResponsibilityOwner,
      controlLevel: editingControl,
      reflection: editingReflection,
      polarity: editingPolarity ?? undefined,
    });
    showToast(t('journal.toast.saved'));
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTask(deleteId);
      setDeleteId(null);
      showToast(t('history.toast.deleted'), 'success');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-10 shadow-sm border border-gray-100 min-h-[600px]">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 tracking-wide text-text">{t('history.title')}</h1>

        {/* Search Bar */}
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300" />
          <input
            type="text"
            placeholder={t('history.search.placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 md:pl-14 pr-4 py-2.5 md:py-4 rounded-lg md:rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 placeholder-gray-300 shadow-sm text-sm md:text-base transition-shadow"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-8">
          {/* Time Filter */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full py-2 md:py-3 px-2 md:px-4 pr-8 md:pr-10 border border-gray-200 rounded-lg md:rounded-xl text-left text-gray-600 text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="all">{t('history.filter.time.all')}</option>
              <option value="today">{t('history.filter.time.today')}</option>
              <option value="week">{t('history.filter.time.week')}</option>
              <option value="month">{t('history.filter.time.month')}</option>
            </select>
            <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Polarity Filter */}
          <div className="relative">
            <select
              value={polarityFilter}
              onChange={(e) => setPolarityFilter(e.target.value as 'all' | 'positive' | 'negative')}
              className="w-full py-2 md:py-3 px-2 md:px-4 pr-8 md:pr-10 border border-gray-200 rounded-lg md:rounded-xl text-left text-gray-600 text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="all">{t('history.filter.polarity.all')}</option>
              <option value="positive">{t('history.filter.polarity.positive')}</option>
              <option value="negative">{t('history.filter.polarity.negative')}</option>
            </select>
            <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 md:py-3 px-2 md:px-4 pr-8 md:pr-10 border border-gray-200 rounded-lg md:rounded-xl text-left text-gray-600 text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="all">{t('history.filter.category.all')}</option>
              {Object.values(TaskCategory).map(cat => (
                <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Owner Filter */}
          <div className="relative">
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="w-full py-2 md:py-3 px-2 md:px-4 pr-8 md:pr-10 border border-gray-200 rounded-lg md:rounded-xl text-left text-gray-600 text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="all">{t('history.filter.owner.all')}</option>
              {Object.values(ResponsibilityOwner).map(owner => (
                <option key={owner} value={owner}>{getOwnerLabel(owner)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Order */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full py-2 md:py-3 px-2 md:px-4 pr-8 md:pr-10 border border-gray-200 rounded-lg md:rounded-xl text-left text-gray-600 text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="newest">{t('history.filter.sort.newest')}</option>
              <option value="oldest">{t('history.filter.sort.oldest')}</option>
            </select>
            <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3 md:space-y-4">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-[#F4F4F4] p-4 md:p-6 md:px-8 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300 group"
            >
              {/* Top Row: Tags + Date */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  {Array.isArray(task.category) ? (
                    task.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#E5E7EB] text-gray-700 px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium tracking-wide"
                      >
                        {getCategoryLabel(cat, task.polarity)}
                      </span>
                    ))
                  ) : (
                    <span className="bg-[#E5E7EB] text-gray-700 px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium tracking-wide">
                      {getCategoryLabel(task.category, task.polarity)}
                    </span>
                  )}
                  <span
                    className="px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium text-white tracking-wide"
                    style={{ backgroundColor: getOwnerColor(task.owner) }}
                  >
                    {getOwnerLabel(task.owner)}
                  </span>
                  <span
                    className={`px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium tracking-wide ${
                      (task.polarity ?? TaskPolarity.Negative) === TaskPolarity.Positive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {t(
                      (task.polarity ?? TaskPolarity.Negative) === TaskPolarity.Positive
                        ? 'polarity.positive'
                        : 'polarity.negative'
                    )}
                  </span>
                </div>
                <span className="text-xs md:text-sm text-gray-500 font-medium tracking-wide self-start md:self-center">
                  {formatDate(task.date)}
                </span>
              </div>

              {/* Bottom Row: Control Bar + Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3 md:gap-6">
                  <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                    <span className="text-xs md:text-sm font-bold text-text whitespace-nowrap tracking-wide">{t('history.control.label')}</span>
                    <div className="flex-1 h-1.5 bg-gray-300/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${task.controlLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-text w-10 md:w-12 text-right">{task.controlLevel}%</span>
                  </div>

                  <button
                    onClick={() => setDeleteId(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 md:p-2 rounded-full hover:bg-white/50 flex-shrink-0"
                  >
                    <Trash2 className="w-5 md:w-5 h-5 md:h-5" />
                  </button>
                </div>

                {/* Edit / View Task Fields */}
                <div className="pt-3 border-t border-gray-200 space-y-3">
                  {editingId === task.id ? (
                    <div className="space-y-4">
                      {/* Category */}
                      <div className="space-y-1">
                        <div className="text-xs md:text-sm font-medium text-gray-700">
                          {t('history.filter.category.all')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.values(TaskCategory).filter(cat => cat !== TaskCategory.Other).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleToggleCategory(cat)}
                              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${editingCategories.includes(cat)
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                            >
                              {getCategoryLabel(cat, editingPolarity)}
                            </button>
                          ))}
                        </div>
                        {/* Custom Category Input */}
                        <div className="mt-2">
                          <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCustomCategory();
                              }
                            }}
                            placeholder={t('taskCategory.Other')}
                            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Worry */}
                      <div className="space-y-1">
                        <div className="text-xs md:text-sm font-medium text-gray-700">
                          {t('history.worry.label')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.values(TaskWorry).filter(w => w !== TaskWorry.Other).map((w) => (
                            <button
                              key={w}
                              type="button"
                              onClick={() => handleToggleWorry(w)}
                              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${editingWorries.includes(w)
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                            >
                              {getWorryLabel(w, editingPolarity)}
                            </button>
                          ))}
                        </div>
                        {/* Custom Worry Input */}
                        <div className="mt-2">
                          <input
                            type="text"
                            value={customWorry}
                            onChange={(e) => setCustomWorry(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCustomWorry();
                              }
                            }}
                            placeholder={t('taskWorry.Other')}
                            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      {/* Polarity + Owner & Control */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="text-xs md:text-sm font-medium text-gray-700">
                            {t('history.polarity.label')}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingPolarity(TaskPolarity.Positive)}
                              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${editingPolarity === TaskPolarity.Positive
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                            >
                              {t('polarity.positive')}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingPolarity(TaskPolarity.Negative)}
                              className={`px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${editingPolarity === TaskPolarity.Negative
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                            >
                              {t('polarity.negative')}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="text-xs md:text-sm font-medium text-gray-700">
                              {t('history.filter.owner.all')}
                            </div>
                            <div className="relative">
                              <select
                                value={editingOwner ?? ''}
                                onChange={(e) => setEditingOwner(e.target.value || null)}
                                className="w-full py-2 px-2 pr-7 border border-gray-200 rounded-lg text-xs md:text-sm bg-white hover:bg-gray-50 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                {Object.values(ResponsibilityOwner).map((owner) => (
                                  <option key={owner} value={owner}>
                                    {getOwnerLabel(owner)}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-xs md:text-sm font-medium text-gray-700">
                              {t('history.control.label')}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={editingControl}
                                onChange={(e) => setEditingControl(Number(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              <span className="text-xs text-gray-500">%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs md:text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          {t('history.modal.cancel')}
                        </button>
                        <button
                          onClick={() => handleSaveTask(task.id)}
                          className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs md:text-sm hover:bg-[#1e2b1e] flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          {t('journal.edit.save')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Summary view */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="text-xs font-medium text-gray-500">{getWorryTitle(task.polarity)}</div>
                          <div className="text-xs md:text-sm text-gray-700">
                            {Array.isArray(task.worry)
                              ? task.worry.map(w => getWorryLabel(w as string, task.polarity)).join('、')
                              : getWorryLabel(task.worry as string, task.polarity)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (editingId === task.id) {
                              setEditingId(null);
                            } else {
                              setEditingId(task.id);
                              setEditingCategories(Array.isArray(task.category) ? task.category : [task.category]);
                              setEditingWorries(Array.isArray(task.worry) ? task.worry : [task.worry]);
                              setEditingOwner(task.owner);
                              setEditingControl(task.controlLevel);
                              setEditingReflection(task.reflection || '');
                              setEditingPolarity(task.polarity ?? TaskPolarity.Negative);
                            }
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">{t('history.empty.title')}</p>
              {(timeFilter !== 'all' || categoryFilter !== 'all' || ownerFilter !== 'all' || search) && (
                <button
                  onClick={() => {
                    setTimeFilter('all');
                    setCategoryFilter('all');
                    setOwnerFilter('all');
                    setSearch('');
                  }}
                  className="mt-4 text-primary text-sm hover:underline"
                >
                  {t('history.empty.clearFilters')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {
        deleteId && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{t('history.modal.title')}</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                  {t('history.modal.message')}
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors text-sm"
                  >
                    {t('history.modal.cancel')}
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 text-sm"
                  >
                    {t('history.modal.confirm')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
