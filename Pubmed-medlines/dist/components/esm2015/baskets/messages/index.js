import { Utils } from "@sinequa/core/base";
import { enSearch, frSearch, deSearch } from "@sinequa/components/search";
import { enSelection, frSelection, deSelection } from "@sinequa/components/selection";
import { enModal, frModal, deModal } from "@sinequa/components/modal";
import _enBaskets from "./en";
import _frBaskets from "./fr";
import _deBaskets from "./de";
const enBaskets = Utils.merge({}, _enBaskets, enSearch, enSelection, enModal);
const frBaskets = Utils.merge({}, _frBaskets, frSearch, frSelection, frModal);
const deBaskets = Utils.merge({}, _deBaskets, deSearch, deSelection, deModal);
export { enBaskets, frBaskets, deBaskets };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsibWVzc2FnZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sVUFBVSxNQUFNLE1BQU0sQ0FBQztBQUM5QixPQUFPLFVBQVUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxVQUFVLE1BQU0sTUFBTSxDQUFDO0FBRTlCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtlblNlYXJjaCwgZnJTZWFyY2gsIGRlU2VhcmNofSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7ZW5TZWxlY3Rpb24sIGZyU2VsZWN0aW9uLCBkZVNlbGVjdGlvbn0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VsZWN0aW9uXCI7XG5pbXBvcnQge2VuTW9kYWwsIGZyTW9kYWwsIGRlTW9kYWx9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL21vZGFsXCI7XG5pbXBvcnQgX2VuQmFza2V0cyBmcm9tIFwiLi9lblwiO1xuaW1wb3J0IF9mckJhc2tldHMgZnJvbSBcIi4vZnJcIjtcbmltcG9ydCBfZGVCYXNrZXRzIGZyb20gXCIuL2RlXCI7XG5cbmNvbnN0IGVuQmFza2V0cyA9IFV0aWxzLm1lcmdlKHt9LCBfZW5CYXNrZXRzLCBlblNlYXJjaCwgZW5TZWxlY3Rpb24sIGVuTW9kYWwpO1xuY29uc3QgZnJCYXNrZXRzID0gVXRpbHMubWVyZ2Uoe30sIF9mckJhc2tldHMsIGZyU2VhcmNoLCBmclNlbGVjdGlvbiwgZnJNb2RhbCk7XG5jb25zdCBkZUJhc2tldHMgPSBVdGlscy5tZXJnZSh7fSwgX2RlQmFza2V0cywgZGVTZWFyY2gsIGRlU2VsZWN0aW9uLCBkZU1vZGFsKTtcblxuZXhwb3J0IHsgZW5CYXNrZXRzLCBmckJhc2tldHMsIGRlQmFza2V0cyB9OyJdfQ==