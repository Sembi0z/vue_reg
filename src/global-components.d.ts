// Base components
import BaseButton from "@/components/Base/BaseButton.vue";
import BackButton from "@/components/Base/BackButton.vue";
import BaseSearch from "@/components/Base/BaseSearch.vue";
import NextButton from "@/components/Base/NextButton.vue";
import DataTable from "@/components/Table/DataTable.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    // Base components
    BaseButton: typeof BaseButton;
    BackButton: typeof BackButton;
    BaseSearch: typeof BaseSearch;
    NextButton: typeof NextButton;
    DataTable: typeof DataTable;
  }
}
