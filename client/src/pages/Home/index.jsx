import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from './Home.module.css';
import Header from '../../components/Header';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Comment from '../../components/Comment';
import { useNoteContext, useUserContext } from '../../hook';

function Home() {
  const inpCmtRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [inpCmt, setInpCmt] = useState(false);
  const [modeNewNote, setModeNewNote] = useState(false);
  const [data, setData] = useState({});

  const [user, setUser] = useUserContext();
  const [notes, setNotes] = useNoteContext();
  const [activeNote, setActiveNote] = useState(null);
  const [bodyRight, setBodyRight] = useState(false);

  useEffect(() => {
    inpCmt ? inpCmtRef.current?.focus() : null;
  }, [inpCmt]);

  const handleNewNote = () => {
    setBodyRight(true);
    setModeNewNote(true);
    setData({
      title: 'Welcome to NOTE APP!',
      content:
        'Welcome to our note-taking app! This app is designed to help you keep track of all your important notes and ideas in one convenient place. With this app, you can easily create, organize, and access your notes from anywhere and at any time. Now, you can focus on what matters most to you.',
    });
  };

  const handleCreateNote = () => {
    const title = titleRef.current?.innerHTML;
    const content = contentRef.current?.innerHTML;

    const newNote = {
      id: new Date().getTime(),
      title,
      content,
      createdAt: new Date().toLocaleString('en-GB', {
        hour12: false,
      }),
      updatedAt: null,
      comments: [],
      author: user?.displayName,
      uid: user?.uid,
    };
    setNotes(
      [...notes, newNote].sort((a, b) => parseInt(b.id) - parseInt(a.id))
    );
    handleClickNote(newNote.id, newNote);
  };

  const handleClickNote = (id, newNote) => {
    setBodyRight(true);
    setInpCmt(false);
    setActiveNote(id);
    setModeNewNote(false);

    let note = notes?.find((note) => note.id == id);
    if (newNote) {
      note = newNote;
    }

    if (note)
      setData({
        uid: note.uid,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        content: note.content,
        author: note.author,
        comments: note.comments,
      });
  };

  const handleCreateCmt = () => {
    const content = inpCmtRef.current?.innerHTML.trim();
    if (content) {
      const newCmt = {
        id: `${activeNote}-${new Date().getTime()}`,
        createdAt: new Date().toLocaleString('en-GB', {
          hour12: false,
        }),
        author: user?.displayName,
        uid: user?.uid,
        content,
      };

      const newNotes = notes.map((n) => {
        if (n.id == activeNote) {
          n.comments.unshift(newCmt);
        }
        return n;
      });

      setNotes(newNotes);
      setInpCmt(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleBlurNote = () => {
    if (bodyRight && !modeNewNote) {
      const title = titleRef.current?.innerHTML;
      const content = contentRef.current?.innerHTML;

      const newNote = {
        title,
        content,
        updatedAt: new Date().toLocaleString('en-GB', {
          hour12: false,
        }),
      };

      const newNotes = notes.map((n) => {
        if (n.id == activeNote) {
          n = {
            ...n,
            ...newNote,
          };
        }
        return n;
      });

      setNotes(newNotes);
      setData((prev) => {
        return {
          ...prev,
          ...newNote,
        };
      });
    }
  };

  const handleDeleteNote = () => {
    const newNotes = notes.filter((n) => n.id != activeNote);

    setNotes(newNotes);
    setBodyRight(false);
  };

  return (
    <div className={clsx(styles.wrapper, 'grid')}>
      <Header />
      <section className={styles.body}>
        <ul className={styles.bodyLeft}>
          {notes?.length > 0 ? (
            notes.map((note) => {
              return (
                <li
                  key={note.id}
                  onClick={() => handleClickNote(note.id, null)}
                  className={clsx(styles.leftItem, {
                    [styles.active]: activeNote === note.id,
                  })}
                >
                  <h6 className={styles.leftItemTitle}>{note.title}</h6>
                  <p className={styles.leftItemText}>{note.content}</p>
                </li>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              You don't have any note!
            </div>
          )}
        </ul>
        {bodyRight && (
          <div className={styles.bodyRight}>
            <div className={styles.bodyRightHeader}>
              <div className={styles.headerLeft}>
                <h5
                  onBlur={handleBlurNote}
                  ref={titleRef}
                  contentEditable='plaintext-only'
                  dangerouslySetInnerHTML={{
                    __html: data?.title,
                  }}
                  suppressContentEditableWarning
                  className={styles.headerTitle}
                ></h5>
                {!modeNewNote && (
                  <div className={styles.headerTime}>
                    {!data?.updatedAt ? (
                      <>
                        Created at {data?.createdAt} by {data?.author}
                      </>
                    ) : (
                      <>
                        Updated at {data?.updatedAt} by {data?.author}
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.headerRight}>
                {!modeNewNote ? (
                  data.uid == user?.uid && (
                    <button
                      onClick={handleDeleteNote}
                      className={styles.headerRightDelete}
                    >
                      <i className='fa-solid fa-trash'></i>
                      <span>Delete</span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleCreateNote}
                    className={styles.headerRightCreate}
                  >
                    <span>Create</span>
                  </button>
                )}
              </div>
            </div>
            <div
              ref={contentRef}
              onBlur={handleBlurNote}
              contentEditable='plaintext-only'
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{
                __html: data?.content,
              }}
              className={styles.bodyRightContent}
            ></div>
            {!modeNewNote && (
              <div className={styles.comments}>
                <div
                  onClick={() => {
                    setInpCmt(!inpCmt);
                  }}
                  className={styles.cmtHeader}
                >
                  <i
                    className={clsx('fa-solid fa-caret-right', styles.icon, {
                      [styles.active]: inpCmt,
                    })}
                  ></i>
                  <span>Add comment</span>
                </div>
                {inpCmt && (
                  <div className={styles.wrapInpCmt}>
                    <div
                      ref={inpCmtRef}
                      contentEditable='plaintext-only'
                      suppressContentEditableWarning
                      className={styles.cmtInp}
                    ></div>
                    <button
                      onClick={handleCreateCmt}
                      className={styles.btnSendCmt}
                      type='submit'
                    >
                      Send
                    </button>
                  </div>
                )}
                {data?.comments?.length > 0 && (
                  <div className={styles.cmtList}>
                    {data?.comments?.map((cmt) => (
                      <Comment key={cmt.id} props={cmt} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div onClick={handleNewNote} className={styles.btnAddNote}>
          <div className={styles.btnAddNoteIcon}>
            <i className='fa-solid fa-pencil'></i>
          </div>
          <div className={styles.btnAddNoteText}>New Note</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
