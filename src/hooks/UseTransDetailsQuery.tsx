import { useMemo } from "react";
import { ITranstype } from "../interfaces/ITranstype.interface";

const UseTransTypeQuery = (
	transType: ITranstype,
	first: number,
	skip: number
) => {
	const detailsQuery = useMemo(() => {
		switch (transType) {
			case "all":
				return `
           swaps(first: ${3}, skip: ${skip / 2}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
           mints(first: ${3}, skip: ${skip / 2}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
           burns(first: ${3}, skip: ${skip / 2}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
         `;
			case "mints":
				return `
           mints(first: ${first}, skip: ${skip}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
         `;
			case "swaps":
				return `
           swaps(first: ${first}, skip: ${skip}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
       `;
			case "burns":
				return `
           burns(first: ${first}, skip: ${skip}) {
             id,
             timestamp
             amountUSD
             transaction{
               id,
             }
           }
         `;
			default:
				return;
		}
	}, [first, skip, transType]);

	return detailsQuery;
};

export default UseTransTypeQuery;
