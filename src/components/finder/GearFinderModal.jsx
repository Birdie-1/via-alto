import React, { useState } from 'react';
import {
  X,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Scale,
  CloudSnow,
  Droplets,
  Mountain,
  Sun,
  Tent,
  Feather,
  Shield,
  CheckCircle,
  Tag
} from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice } from '../../data/products';
import { QUIZ_QUESTIONS, getRecommendedKit } from '../../data/gearFinder';
import { TRANSLATIONS } from '../../data/translations';

// Icon Map helper
const ICON_MAP = {
  CloudSnow,
  Droplets,
  Mountain,
  Sun,
  Tent,
  Compass,
  Feather,
  Shield,
  CheckCircle
};

export default function GearFinderModal({
  isOpen,
  onClose,
  onAddToCartBatch,
  lang = 'en'
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    destination: 'winter_alpine',
    duration: 'weekend_camp',
    priority: 'ultralight'
  });
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS.find((q) => q.step === currentStep);
  const isResultStep = currentStep > QUIZ_QUESTIONS.length;

  const recommendedKit = isResultStep ? getRecommendedKit(answers, lang) : null;

  // Initialize selected items when entering result step
  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (currentStep < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Reached results
      const kit = getRecommendedKit({ ...answers, [questionId]: optionId }, lang);
      setSelectedProductIds(kit.items.map((i) => i.id));
      const initialSizes = {};
      kit.items.forEach((item) => {
        initialSizes[item.id] = item.sizes?.[0] || 'Standard';
      });
      setSelectedSizes(initialSizes);
      setCurrentStep(QUIZ_QUESTIONS.length + 1);
    }
  };

  const handleRetake = () => {
    setCurrentStep(1);
    setAnswers({
      destination: 'winter_alpine',
      duration: 'weekend_camp',
      priority: 'ultralight'
    });
  };

  const toggleItemSelection = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddSelectedToBag = () => {
    if (!recommendedKit) return;
    const itemsToAdd = recommendedKit.items
      .filter((item) => selectedProductIds.includes(item.id))
      .map((item) => ({
        product: item,
        quantity: 1,
        selectedSize: selectedSizes[item.id] || item.sizes?.[0] || 'Standard'
      }));

    onAddToCartBatch(itemsToAdd);
    onClose();
  };

  // Progress percentage
  const progressPercent = Math.round((Math.min(currentStep, 3) / 3) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-4xl border border-stone-light/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Alpine Header */}
        <div className="bg-[#183C32] text-offwhite p-5 sm:p-6 border-b border-forest-light relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-beige">
                <Compass size={20} />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                  {t.finder_modal_title}
                </h2>
                <p className="text-xs text-beige tracking-wider">
                  {t.finder_modal_subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Animated Progress Bar */}
          {!isResultStep && (
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-stone-light">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {t.finder_step} {currentStep} {t.finder_of} 3
              </span>
              <div className="w-36 sm:w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-beige transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Questionnaire Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {!isResultStep && currentQuestion && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-1 max-w-xl mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {currentQuestion.title[lang] || currentQuestion.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-stone font-sans">
                  {currentQuestion.subtitle[lang] || currentQuestion.subtitle.en}
                </p>
              </div>

              {/* 3 Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {currentQuestion.options.map((opt) => {
                  const Icon = ICON_MAP[opt.icon] || Compass;
                  const isSelected = answers[currentQuestion.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleOptionSelect(currentQuestion.id, opt.id)}
                      className={`p-5 text-left border transition-all flex flex-col justify-between space-y-4 cursor-pointer shadow-xs group ${
                        isSelected
                          ? 'bg-white border-forest ring-2 ring-forest/20'
                          : 'bg-white border-stone-light/70 hover:border-forest/50 hover:bg-beige/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-10 h-10 rounded-full bg-forest/10 group-hover:bg-forest group-hover:text-offwhite text-forest flex items-center justify-center transition-colors">
                          <Icon size={20} />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-forest border-forest text-offwhite'
                              : 'border-stone-light bg-offwhite'
                          }`}
                        >
                          {isSelected && <Check size={12} />}
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
                          {opt.title[lang] || opt.title.en}
                        </h4>
                        <p className="text-xs text-stone font-sans leading-relaxed">
                          {opt.description[lang] || opt.description.en}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-light/30 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-forest">
                        <span>Select</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              {currentStep > 1 && (
                <div className="pt-4 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-brand font-semibold text-stone hover:text-charcoal cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>{t.finder_back}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RESULTS VIEW: Personalized Kit Match */}
          {isResultStep && recommendedKit && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Result Banner */}
              <div className="bg-[#183C32] text-offwhite p-6 border border-forest-light shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-1 z-10">
                  <div className="inline-flex items-center gap-2 text-beige text-[10px] font-bold uppercase tracking-brand-wide">
                    <Sparkles size={13} />
                    <span>{recommendedKit.matchScore}% {t.finder_result_match}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {recommendedKit.title}
                  </h3>
                  <p className="text-xs text-stone-light max-w-xl">
                    {recommendedKit.subtitle}
                  </p>
                </div>

                {/* Weight and Savings Pill */}
                <div className="flex items-center gap-3 z-10">
                  <div className="p-3 bg-white/10 border border-white/20 text-center min-w-[120px]">
                    <span className="text-[10px] uppercase tracking-brand text-beige block font-medium">
                      {t.finder_est_weight}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-1">
                      <Scale size={16} className="text-beige" />
                      {recommendedKit.totalWeightFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Items Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-lg font-bold text-charcoal uppercase tracking-wider">
                    {t.finder_selected_items} ({selectedProductIds.length}/{recommendedKit.items.length})
                  </span>
                  <span className="text-stone">
                    {selectedProductIds.length} items checked
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedKit.items.map((item) => {
                    const isChecked = selectedProductIds.includes(item.id);
                    const itemName = lang === 'th' ? item.name_th || item.name : item.name;
                    const itemCat = lang === 'th' ? item.category_th || item.category : item.category;

                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 border transition-all flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-white border-forest shadow-xs'
                            : 'bg-white/50 border-stone-light/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItemSelection(item.id)}
                            className="accent-forest w-4 h-4 cursor-pointer shrink-0"
                          />

                          <div className="w-16 h-16 bg-[#F7F5F0] overflow-hidden border border-stone-light/50 shrink-0">
                            <img
                              src={item.image}
                              alt={itemName}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase tracking-brand font-semibold text-stone block">
                              {itemCat}
                            </span>
                            <h4 className="font-sans text-xs sm:text-sm font-semibold text-charcoal line-clamp-1">
                              {itemName}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="font-bold text-forest font-sans">
                                {formatPrice(item.price)}
                              </span>
                              {item.specs?.weight && (
                                <span className="text-stone font-mono text-[10px]">
                                  • {item.specs.weight}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Size Picker for Wearables */}
                        {item.sizes && item.sizes.length > 1 && (
                          <div className="shrink-0">
                            <select
                              value={selectedSizes[item.id] || item.sizes[0]}
                              onChange={(e) => handleSizeChange(item.id, e.target.value)}
                              className="px-2 py-1 bg-offwhite border border-stone-light text-[11px] font-medium text-charcoal"
                            >
                              {item.sizes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Summary & 1-Click Action */}
              <div className="p-5 bg-white border border-stone-light/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    <Tag size={12} />
                    <span>{t.finder_bundle_deal_tag}</span>
                  </div>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl sm:text-2xl font-bold font-sans text-forest">
                      {formatPrice(recommendedKit.bundleDiscountPrice)}
                    </span>
                    <span className="text-xs text-stone line-through font-sans">
                      {formatPrice(recommendedKit.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="px-4 py-2.5 border border-stone-light text-stone hover:text-charcoal text-xs uppercase tracking-brand font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>{t.finder_retake}</span>
                  </button>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAddSelectedToBag}
                    disabled={selectedProductIds.length === 0}
                    icon={ShoppingBag}
                  >
                    {t.finder_add_all}
                  </Button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
