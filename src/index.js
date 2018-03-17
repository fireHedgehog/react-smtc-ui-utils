import PublicTables from './tables/PublicTables';
import PublicTableHeaders from './tables/PublicTableHeaders';
import {CustomizedFooter} from './tables/PublicTableFooters'
import PublicStep from "./PublicStep";

// export components as named exports
export { PublicTables ,PublicTableHeaders,PublicStep,CustomizedFooter}

// alternative, more concise syntax for named exports

// you can optionally also set a default export for your module
export default { PublicTables,PublicTableHeaders,PublicStep,CustomizedFooter}