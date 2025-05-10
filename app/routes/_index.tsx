import { Badge, Button, Card, Container, Group, Image, Text } from "@mantine/core";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "~/libs/db";

export const loader = () => {
  const pages = db().pages;
  return pages;
};
const Pages = () => {
  const pages = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-[100svh] items-center justify-center">
      <div className="w-full bg-slate-100 h-12 shadow flex items-center px-4">
        <Text className="font-semibold text-xl">Header Zone</Text>
      </div>
      <div className="flex gap-2 h-full">
        <Container size="lg" className="flex flex-col h-full w-full p-4">
          <Text className="text-base">Home {">"} Blog Management</Text>
          <div className="w-full h-full grid grid-cols-12 gap-4 p-2 m-2">
            {pages?.map((page) => {
              return (
                <Card shadow="sm" padding="lg" radius="md" withBorder className="col-span-3" key={page.title}>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{page.title}</Text>
                    <Badge color="pink">On Sale</Badge>
                  </Group>

                  <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate(`/${page.id}`)}>
                    View more
                  </Button>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Pages;
