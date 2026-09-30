// There is 2 Methods : try-catch and promises but we use promise methods

/*
 const asyncHandler = () => {}
 const asyncHandler = () => {
    () => {

    }
 }

 */

const asyncHandler = (requestHandler) => {
   (req, res , next) => {
       Promise.resolve(requestHandler(req, res , next)).
       catch((err) => next(err))  // catch means reject
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



