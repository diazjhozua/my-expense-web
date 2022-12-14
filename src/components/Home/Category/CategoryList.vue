<template>
  <v-container class="mt-5">
    <div class="d-flex justfiy-space-between">
      <header class="text-h5">Category List</header>
      <v-spacer></v-spacer>
      <v-btn @click="createItem" class="white--text mb-3 px-10" color="#272727"
        >Create <v-icon class="ml-3">mdi-clipboard-plus</v-icon></v-btn
      >
    </div>

    <p class="text-subtitle-1 mt-4">
      These are the list of category in your account. Once you are a registered
      user, the system will generate five default categories. You can modify or
      add any categories you want.
    </p>

    <v-card class="mb-15">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="categories || []"
      >
        <template v-slot:[`item.dateCreated`]="{ item }">
          <div>{{ item.dateCreated | ddMmmmYHhSsA }}</div>
        </template>
        <template v-slot:[`item.limit`]="{ item }">
          <div>{{ item.limit | toPhp }}</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteConfirmation(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <category-form></category-form>
    <delete-dialog @deleteHandler="deleteItem"></delete-dialog>
  </v-container>
</template>

<script>
import CategoryForm from "./CategoryForm.vue";
import DeleteDialog from "@/components/global/DeleteDialog.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Category",
          align: "start",
          value: "name",
        },
        { text: "Limit", value: "limit" },
        { text: "Date Created", value: "dateCreated" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      deleteId: null,
    };
  },
  components: {
    CategoryForm,
    DeleteDialog,
  },
  async created() {
    await this.getCategoriesAction();
  },
  computed: {
    ...mapState("category", ["categories"]),
  },
  methods: {
    ...mapActions("category", [
      "getCategoriesAction",
      "getCategoryByIdAction",
      "deleteCategoryAction",
    ]),
    ...mapMutations("category", ["openCategoryForm", "setIsEditing"]),
    ...mapMutations("global", ["setDeleteDialog"]),
    createItem() {
      this.openCategoryForm();
      this.setIsEditing(false);
    },
    async editItem(item) {
      try {
        await this.getCategoryByIdAction(item.id);
        this.openCategoryForm();
        this.setIsEditing(true);
      } catch (error) {
        //
      }
    },
    openDeleteConfirmation(item) {
      this.deleteId = item.id;
      this.setDeleteDialog({
        visible: true,
        title: "Delete category confirmation",
        message: `Are you sure you want to delete this category(${item.name})? `,
      });
    },

    async deleteItem() {
      try {
        await this.deleteCategoryAction(this.deleteId);
        this.setDeleteDialog({
          visible: false,
          title: "",
          message: "",
        });
      } catch (error) {
        //
      }
    },
  },
  filters: {
    ddMmmmYHhSsA: function (dateTime) {
      if (!dateTime) return "";
      return format(parseISO(dateTime), "MMMM dd  y, hh:ss a");
    },
    toPhp(value) {
      if (isNaN(value)) {
        value = 0;
      }
      return `??? ${value.toLocaleString()}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
