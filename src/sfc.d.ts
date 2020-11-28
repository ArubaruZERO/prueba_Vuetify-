//Para decirle a Typescript como usar sfc

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}