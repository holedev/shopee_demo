import clsx from 'clsx';
import styles from './Comment.module.css';
import { Image } from 'react-bootstrap';
import { handleDatetime } from '~/utiils/datetime';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';

function Comment({
  value,
  reply,
  setInfoComment,
  setComment,
  handleDeleteCmt,
}) {
  const handleReply = (val) => {
    const fullName = val.author.fullName;
    setInfoComment(`Trả lời bình luận của ${fullName}`);
    setComment((prev) => {
      return {
        ...prev,
        content: val.parent ? `@${fullName} ${prev.content}` : prev.content,
        parentId: val.parent ? val.parent : val.id,
      };
    });
  };

  const handleDelete = async (val) => {
    await authApis()
      .delete(endpoints.comments + val.id + '/')
      .then((res) => handleDeleteCmt(val.id))
      .catch((err) => console.log(err));
  };

  return (
    value && (
      <>
        <div className={clsx(styles.wrapper)}>
          <Image
            className={styles.avatar}
            roundedCircle
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
              aspectRatio: 1,
            }}
            src={value?.author?.avatar}
          ></Image>
          <div className={styles.bodyRight}>
            <div className={styles.head}>
              <b>{value.author.fullName}</b> -{' '}
              {handleDatetime(value?.createDate)}
            </div>
            <div className={styles.content}>{value?.content}</div>
            <div className={styles.action}>
              <span onClick={() => handleReply(value)} className={styles.span}>
                Trả lời
              </span>
              <span onClick={() => handleDelete(value)} className={styles.span}>
                Xoá
              </span>
            </div>
          </div>
        </div>
        <div>
          {reply?.length > 0 &&
            reply.map((item) => {
              return (
                <div
                  key={item.id}
                  className={clsx(styles.wrapper, styles.levelChild)}
                >
                  <Image
                    className={styles.avatar}
                    roundedCircle
                    width={40}
                    height={40}
                    style={{
                      objectFit: 'cover',
                      aspectRatio: 1,
                    }}
                    src={item?.author?.avatar}
                  ></Image>
                  <div className={styles.bodyRight}>
                    <div className={styles.head}>
                      <b>{item?.author.fullName}</b> -{' '}
                      {handleDatetime(item?.createDate)}
                    </div>
                    <div className={styles.content}>{item?.content}</div>
                    <div className={styles.action}>
                      <span
                        onClick={() => handleReply(item)}
                        className={styles.span}
                      >
                        Trả lời
                      </span>
                      <span
                        onClick={() => handleDelete(item)}
                        className={styles.span}
                      >
                        Xoá
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    )
  );
}

export default Comment;
