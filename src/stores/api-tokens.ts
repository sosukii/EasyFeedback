import { defineStore } from 'pinia';

export const useAPITokensStore = defineStore('APITokens', {
  state: () => ({
    feedbackRead: '',
    feedbackWrite: ''
  }),
  actions: {
    setfeedbackREAD(token: string) {
      this.feedbackRead = token;
    },
    setfeedbackWRITE(token: string) {
      this.feedbackWrite = token;
    },
    clearAll(): void {
      this.setfeedbackREAD('')
      this.setfeedbackWRITE('')
    }
  },
});
