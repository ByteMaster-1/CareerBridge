import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,
  },
  reducers: {
    // Set the full applicants payload
    setAllApplicants(state, action) {
      state.applicants = action.payload;
    },
    // Optimistically update one application's status
    updateApplicationStatus(state, action) {
      const { id, status } = action.payload;
      if (state.applicants?.applications) {
        state.applicants.applications = state.applicants.applications.map(app =>
          app._id === id ? { ...app, status } : app
        );
      }
    },
  },
});

export const {
  setAllApplicants,
  updateApplicationStatus,   // New action
} = applicationSlice.actions;

export default applicationSlice.reducer;
