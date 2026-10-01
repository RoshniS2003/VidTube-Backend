// There is 2 Methods : try-catch and promises but we use promise methods

/*
 const asyncHandler = () => {}
 const asyncHandler = () => {
    () => {

    }
 }

 */

// controller mein baar-baar try-catch na likhna pade isliye asyncHandler usr karte
// Har bar controllers ke andar try-catch likhna na pade repetitive kam na karna padega isliye ham asyncHandler banaya 
//  Async controller mein error aaye to automatically next(err) ko bhej do.
const asyncHandler = (requestHandler) => {
   return (req, res , next) => {
       Promise.resolve(requestHandler(req, res , next))
       .catch((err) => next(err))  // catch means reject
   }
}

export { asyncHandler }


  /*
const asyncHandler = () => {}
const asyncHandler = (func) => () => {}
const asyncHandler = (func) => async () => {}

  
    const asyncHandler = (func) => async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            res.status(err.code || 500).json({
                success: false,
                message: err.message
            })
        }
    }
*/



