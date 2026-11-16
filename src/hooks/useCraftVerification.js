import { useState, useCallback, useRef, useEffect } from 'react';
import { runAiVerification } from '../services/aiVerificationEngine';

/**
 * Custom Hook: useCraftVerification
 *
 * Demonstrates Unit III:
 * - State management with useState
 * - Functional state updates
 * - Performance optimization with useCallback
 * - Timer cleanup and side effect management
 * - Custom hook abstraction
 */

export function useCraftVerification() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error'
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Use a ref to track timers for reliable cleanup
  const timerRef = useRef(null);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  /**
   * Start sequential multi-stage verification
   */
  const startVerification = useCallback(async ({ image, craftId, claimedDistrict, giTagInput, sampleData }) => {
    setStatus('scanning');
    setProgress(10);
    setError(null);
    setResult(null);
    setCurrentStepText('Phase 1/4: Analyzing surface matrix and thread density...');

    try {
      // Step 1: Surface / Weave scan simulation
      await new Promise(resolve => {
        timerRef.current = setTimeout(() => {
          setProgress(35);
          setCurrentStepText('Phase 2/4: Matching heritage motif geometry against GI archives...');
          resolve();
        }, 600);
      });

      // Step 2: Motif geometry scan
      await new Promise(resolve => {
        timerRef.current = setTimeout(() => {
          setProgress(65);
          setCurrentStepText('Phase 3/4: Inspecting chromatic spectrum and natural dye absorption...');
          resolve();
        }, 700);
      });

      // Step 3: Chromatic & dye scan
      await new Promise(resolve => {
        timerRef.current = setTimeout(() => {
          setProgress(85);
          setCurrentStepText('Phase 4/4: Cross-referencing official ODOP district registry...');
          resolve();
        }, 600);
      });

      // Final computation
      const report = await runAiVerification({
        image,
        craftId,
        claimedDistrict,
        giTagInput,
        sampleData
      });

      await new Promise(resolve => {
        timerRef.current = setTimeout(() => {
          setProgress(100);
          setCurrentStepText('Verification complete! Generating authenticity report...');
          resolve();
        }, 400);
      });

      setResult(report);
      setStatus('complete');
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to complete craft verification.');
      setStatus('error');
    }
  }, []);

  /**
   * Reset state to run another verification
   */
  const resetVerification = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setStatus('idle');
    setProgress(0);
    setCurrentStepText('');
    setResult(null);
    setError(null);
  }, []);

  return {
    status,
    progress,
    currentStepText,
    result,
    error,
    startVerification,
    resetVerification,
    isScanning: status === 'scanning'
  };
}
