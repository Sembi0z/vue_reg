import type { App } from "vue";

// Base components
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseSearch from "@/components/Base/BaseSearch.vue";
import BackButton from "@/components/Base/BackButton.vue";
import NextButton from "@/components/Base/NextButton.vue";
import DataTable from "@/components/Table/DataTable.vue";

export default {
  install(app: App): void {
    // Register global components here
    app.component("BaseButton", BaseButton);
    app.component("BaseSearch", BaseSearch);
    app.component("BackButton", BackButton);
    app.component("NextButton", NextButton);
    app.component("DataTable", DataTable);
  },
};
