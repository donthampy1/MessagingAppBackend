import express, { Router } from 'express'
import { login, searchUsers } from '../controllers/userControllers'
import { requireAuth } from '@clerk/express';

const router: Router = Router();

router.post('/login', login)
router.get('/search', requireAuth(), searchUsers)

export default router 


// <div>
//                       <ChatMessages messages={messages} />
//                       </div><div className="border-t  mt-4 p-4  h-16" >

    //   <form
    //     onSubmit={handleMessageSubmit}
    //     className="flex items-end bg-blue-800 space-x-2"
       


//  <div className=" p-5 bg-yellow-600 h-full flex flex-col">
//     {/* Chat Messages Section */}
//       {selectedChat ? (
//         loading ? (
//           <div className="h-full">
//             <p>Chat loading...</p>
//           </div>
//         ) : (
//           <div className=" h-1/2">
//             <ChatMessages messages={messages} />
//           </div>
//         )
//       ) : (
//         <div>
//           <p>Click on a user to start chatting</p>
//         </div>
//       )}
//     </div>
