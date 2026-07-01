import { useEffect } from 'react';

export function useLivePreview<T>(
  updateType: 'PORTFOLIO_PREVIEW_UPDATE' | 'ARTIST_INFO_PREVIEW_UPDATE',
  setData: (data: T) => void
) {
  useEffect(() => {
    // Only listen for preview messages if the page is rendered in an iframe
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (!isIframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === updateType) {
        setData(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [updateType, setData]);
}
