import { Utils } from "@sinequa/core/base";
import { enSearch, frSearch, deSearch } from "@sinequa/components/search";
import { enModal, frModal, deModal } from "@sinequa/components/modal";
import _enLabels from "./en";
import _frLabels from "./fr";
import _deLabels from "./de";
const enLabels = Utils.merge({}, _enLabels, enSearch, enModal);
const frLabels = Utils.merge({}, _frLabels, frSearch, frModal);
const deLabels = Utils.merge({}, _deLabels, deSearch, deModal);
export { enLabels, frLabels, deLabels };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9sYWJlbHMvIiwic291cmNlcyI6WyJtZXNzYWdlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxTQUFTLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sU0FBUyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxNQUFNLENBQUM7QUFFN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9ELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge2VuU2VhcmNoLCBmclNlYXJjaCwgZGVTZWFyY2h9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHtlbk1vZGFsLCBmck1vZGFsLCBkZU1vZGFsfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9tb2RhbFwiO1xuaW1wb3J0IF9lbkxhYmVscyBmcm9tIFwiLi9lblwiO1xuaW1wb3J0IF9mckxhYmVscyBmcm9tIFwiLi9mclwiO1xuaW1wb3J0IF9kZUxhYmVscyBmcm9tIFwiLi9kZVwiO1xuXG5jb25zdCBlbkxhYmVscyA9IFV0aWxzLm1lcmdlKHt9LCBfZW5MYWJlbHMsIGVuU2VhcmNoLCBlbk1vZGFsKTtcbmNvbnN0IGZyTGFiZWxzID0gVXRpbHMubWVyZ2Uoe30sIF9mckxhYmVscywgZnJTZWFyY2gsIGZyTW9kYWwpO1xuY29uc3QgZGVMYWJlbHMgPSBVdGlscy5tZXJnZSh7fSwgX2RlTGFiZWxzLCBkZVNlYXJjaCwgZGVNb2RhbCk7XG5cbmV4cG9ydCB7IGVuTGFiZWxzLCBmckxhYmVscywgZGVMYWJlbHMgfTtcbiJdfQ==