'use client'; // 指定该模块是客户端组件，确保可以使用 React Hooks

import { useState, useLayoutEffect, useCallback, useEffect } from 'react';

// 自适应布局配置项的接口定义
interface AdaptiveLayoutOptions {
  designWidth?: number; // 设计稿的宽度（默认 1920）
  designHeight?: number; // 设计稿的高度（默认 919）
  minWidth?: number; // 允许的最小屏幕宽度（默认 320）
  maxWidth?: number; // 允许的最大屏幕宽度（默认 2560）
  basePixelSize?: number; // 基础字体大小 (默认 16px)
  minFontSize?: number; // 允许的最小字体大小 (默认 12px)
  debounceDelay?: number; // 触发更新的防抖时间（默认 250ms）
}

export function useAdaptiveLayout({
  designWidth = 1920,
  designHeight = 919,
  minWidth = 320,
  maxWidth = 2560,
  basePixelSize = 16,
  minFontSize = 12,
  debounceDelay = 250,
}: AdaptiveLayoutOptions = {}) {
  const [scale, setScale] = useState<number>(1); // 存储当前缩放比例
  const [isInitialized, setIsInitialized] = useState(false); // 是否已经初始化

  // 计算缩放比例
  const calculateScale = useCallback(() => {
    if (typeof window === 'undefined') return 1; // 确保 window 存在

    // 获取窗口宽度，并限制在 minWidth ~ maxWidth 之间
    const width = Math.min(Math.max(window.innerWidth, minWidth), maxWidth);
    const height = window.innerHeight; // 获取窗口高度

    // 计算基于设计尺寸的缩放比例
    const widthScale = width / designWidth;
    const heightScale = height / designHeight;

    return Math.min(widthScale, heightScale); // 选较小的比例，确保 UI 完全适配
  }, [designWidth, designHeight, minWidth, maxWidth]);

  // 更新 html 根元素的 font-size，使页面按照比例缩放
  const updateLayout = useCallback(() => {
    const newScale = calculateScale();
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const calculatedFontSize = basePixelSize * newScale;
      const finalFontSize = Math.max(calculatedFontSize, minFontSize);

      // 设置根元素的字体大小
      html.style.fontSize = `${finalFontSize}px`;
      html.style.setProperty('--adaptive-font-size', `${finalFontSize}px`);
      html.style.setProperty('--adaptive-scale', String(newScale));

      // 适应全屏，防止滚动
      html.style.height = '100%';
      html.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    }
    setScale(newScale); // 更新缩放状态
  }, [calculateScale, basePixelSize, minFontSize]);

  // 监听窗口大小变化，并防抖执行 updateLayout
  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedUpdateLayout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateLayout, debounceDelay);
    };

    updateLayout(); // 初始化时执行一次
    setIsInitialized(true);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debouncedUpdateLayout);
      window.addEventListener('orientationchange', debouncedUpdateLayout);
    }

    return () => {
      clearTimeout(timeoutId);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', debouncedUpdateLayout);
        window.removeEventListener('orientationchange', debouncedUpdateLayout);
      }
    };
  }, [updateLayout, debounceDelay]);

  // 解决 FOUC（Flash of Unstyled Content）问题，防止样式加载前的闪烁
  useEffect(() => {
    if (typeof document !== 'undefined' && !isInitialized) {
      document.documentElement.style.setProperty('opacity', '0'); // 初始隐藏
    } else if (typeof document !== 'undefined') {
      document.documentElement.style.removeProperty('opacity'); // 加载完成后恢复
    }
  }, [isInitialized]);

  return scale; // 返回当前缩放比例
}
