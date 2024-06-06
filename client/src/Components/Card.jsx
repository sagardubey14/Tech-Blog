import Editor from '@monaco-editor/react';
import personIcon from '../assets/icons8-person-48.png'


function Card() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="max-w-sm bg-blue-300 rounded overflow-hidden shadow-lg">
        <Editor
            className="mt-3"
            height="10vh"
            defaultLanguage="javascript"
            defaultValue={`let ans= 5; \nalert(ans)`}
            theme='vs-dark'
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Ttile-1</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords1</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords2</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords3</span>
        </div>
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">User1</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>
      </div>
      <div className="max-w-sm bg-blue-300 rounded overflow-hidden shadow-lg">
        <Editor
            className="mt-3"
            height="10vh"
            defaultLanguage="javascript"
            defaultValue={`let ans= 5; \nconsole.log(ans)`}
            theme='vs-dark'
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Title-2</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords1</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords2</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords3</span>
        </div>
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">User2</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>
      </div>
      <div className="max-w-sm bg-blue-300 rounded overflow-hidden shadow-lg">
        <Editor
            className="mt-3"
            height="10vh"
            defaultLanguage="javascript"
            defaultValue={`let a= 5;\nlet b=6; \nalert(a+b);`}
            theme='vs-dark'
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Title-3</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords1</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords2</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords3</span>
        </div>
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">User3</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>
      </div>
      <div className="max-w-sm bg-blue-300 rounded overflow-hidden shadow-lg">
        <Editor
            className="mt-3"
            height="10vh"
            defaultLanguage="javascript"
            defaultValue={`let ans= 5;\nlet bns=7 \nconsole.log(ans+bns)`}
            theme='vs-dark'
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Title-4</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords1</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords2</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#keywords3</span>
        </div>
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">User4</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
