import { useState } from 'react';

const initialData = {
  id: '',
  title: '',
  image: '',
  content: '',
  category: '',
  tags: [],
  published: false,
};

const App = () => {
  const [postList, setPostList] = useState([]);
  const [formValues, setFormValues] = useState(initialData);
  const [editValues, setEditValues] = useState(initialData);
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleChange = (e, values, setValues, fieldName) => {
    const newValues = { ...values };
    newValues[fieldName] = e.target.value;
    setValues(newValues);
  };

  const createPost = (e) => {
    e.preventDefault();
    setPostList([...postList, { ...formValues, id: crypto.randomUUID() }]);
    setFormValues(initialData);
  };

  const updatePost = (e) => {
    e.preventDefault();
    setPostList(
      postList.map((post) => (post.id === editValues.id ? editValues : post)),
    );
    setToggleEdit(false);
    setEditValues(initialData);
  };

  const openFormAndSetValueEdit = (postToUpdate) => {
    setToggleEdit(true);
    setEditValues(postToUpdate);
  };

  const removePost = (postId) => {
    setPostList(postList.filter((post) => post.id !== postId));
  };

  function handleTagsChange(e) {
    // recupero il valore del checkbox
    const value = e.target.value;

    // recupero lo stato della checkbox
    // const checked = e.target.checked;

    let tags = [...formValues.tags];

    tags.push(value);

    setFormValues((data) => {
      return {
        ...data,
        tags,
      };
    });
  }

  return (
    <>
      <h1 className="py-8 text-center font-mono text-3xl font-bold">
        Post Create
      </h1>
      <form onSubmit={createPost} className="mx-auto flex max-w-xl flex-col">
        {/* Titolo  */}
        <label htmlFor="title" className="font-semibold">
          Titolo del post
        </label>
        <input
          value={formValues.title}
          onChange={(e) => handleChange(e, formValues, setFormValues, 'title')}
          type="text"
          name="title"
          className="mb-2 w-full rounded-md border-2 p-2 text-black"
        />
        {/* Immagine  */}
        <label htmlFor="image" className="font-semibold">
          Immagine del post
        </label>
        <input
          value={formValues.image}
          onChange={(e) => handleChange(e, formValues, setFormValues, 'image')}
          type="text"
          name="image"
          className="mb-2 w-full rounded-md border-2 p-2 text-black"
        />
        {/* Content  */}
        <label htmlFor="content" className="font-semibold">
          Contenuto del post
        </label>
        <textarea
          name="content"
          value={formValues.content}
          onChange={(e) =>
            handleChange(e, formValues, setFormValues, 'content')
          }
          cols="30"
          rows="5"
          className="mb-3 w-full rounded-md border-2 p-2 text-black"
        ></textarea>
        {/* Categoria  */}
        <select
          value={formValues.category}
          onChange={(e) =>
            handleChange(e, formValues, setFormValues, 'category')
          }
          className="mb-2 w-full rounded-md border-2 p-1 text-black"
        >
          <option value="">Seleziona una categoria</option>
          <option value="1">Opzione 1</option>
          <option value="2">Opzione 2</option>
          <option value="3">Opzione 3</option>
          <option value="4">Opzione 4</option>
        </select>

        {/* Tags  */}
        <div className="flex gap-4">
          <label className="">
            <input
              type="checkbox"
              checked={formValues.tags.includes('1')}
              value="1"
              onChange={handleTagsChange}
              className="mr-1"
            />
            Tag 1
          </label>
          <label className="">
            <input
              type="checkbox"
              checked={formValues.tags.includes('2')}
              value="2"
              onChange={handleTagsChange}
              className="mr-1"
            />
            Tag 2
          </label>
          <label className="">
            <input
              type="checkbox"
              checked={formValues.tags.includes('3')}
              value="3"
              onChange={handleTagsChange}
              className="mr-1"
            />
            Tag 3
          </label>
          <label className="">
            <input
              type="checkbox"
              checked={formValues.tags.includes('4')}
              value="4"
              onChange={handleTagsChange}
              className="mr-1"
            />
            Tag 4
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 self-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-md shadow-blue-800 transition-all delay-100 duration-200 ease-in-out hover:translate-y-1 hover:scale-105 hover:bg-blue-700 hover:font-semibold"
        >
          Crea il Post
        </button>
      </form>

      <h2 className="px-8 py-8 font-mono text-2xl font-bold">Posts List</h2>
      <form
        onSubmit={updatePost}
        className={`${!toggleEdit && 'hidden'} px-8 py-8`}
      >
        <label htmlFor="title" className="font-semibold">
          Titolo del post
        </label>
        <input
          value={editValues.title}
          onChange={(e) => handleChange(e, editValues, setEditValues, 'title')}
          type="text"
          name="title"
          className="mb-2 w-full rounded-md border-2 p-2 text-black"
        />

        <button
          type="submit"
          className="rounded-md bg-orange-500 px-4 py-1 text-sm font-semibold"
        >
          Modifica
        </button>
      </form>
      <ul className="max-w-2xl">
        {postList.map((post, i) => (
          <li className="mb-3 flex justify-between pl-4 pr-40" key={post.id}>
            <span>
              <span className="mr-4 font-bold">{i + 1}.</span> {post.title}
            </span>
            <div>
              <span
                onClick={() => openFormAndSetValueEdit(post)}
                className="mr-4 rounded-md bg-orange-400 px-2 py-1 text-sm font-semibold shadow-sm shadow-orange-500 delay-100 duration-200 hover:cursor-pointer hover:bg-orange-600 hover:px-4"
              >
                Edit
              </span>
              <span
                onClick={() => removePost(post.id)}
                className="font-bold hover:cursor-pointer"
              >
                <i className="fa-solid fa-trash-can duration-200 hover:text-orange-600"></i>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
