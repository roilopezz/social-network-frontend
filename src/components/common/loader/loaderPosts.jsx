import { Skeleton } from "@material-ui/lab";
import { Card, CardHeader } from "@material-ui/core";

const LoaderPosts = () => {
  return (
    <div className="pt-4 container-posts">
      <Card style={{ borderRadius: "20px" }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={15}
              width="9%"
              style={{ marginBottom: 6 }}
            />
          }
        />

        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="5%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <>
              <Skeleton
                animation="wave"
                height={10}
                width="7%"
                className="mb-1"
              />

              <Skeleton animation="wave" height={10} width="10%" />
            </>
          }
        />
        <br />
        <br />
        <br />
        <br />
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </Card>

      <Card style={{ borderRadius: "20px" }} className="mt-4">
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={15}
              width="9%"
              style={{ marginBottom: 6 }}
            />
          }
        />

        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="5%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <>
              <Skeleton
                animation="wave"
                height={10}
                width="7%"
                className="mb-1"
              />

              <Skeleton animation="wave" height={10} width="10%" />
            </>
          }
        />
        <br />
        <br />
        <br />
        <br />
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </Card>

      <Card style={{ borderRadius: "20px" }} className="mt-4">
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={15}
              width="9%"
              style={{ marginBottom: 6 }}
            />
          }
        />

        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="5%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <>
              <Skeleton
                animation="wave"
                height={10}
                width="7%"
                className="mb-1"
              />

              <Skeleton animation="wave" height={10} width="10%" />
            </>
          }
        />
        <br />
        <br />
        <br />
        <br />
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </Card>
    </div>
  );
};

export default LoaderPosts;
