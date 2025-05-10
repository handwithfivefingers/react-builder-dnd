import { Center, Container, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { LuPencilLine } from "react-icons/lu";
import { VscTrash } from "react-icons/vsc";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { db } from "~/libs/db";

export const loader = () => {
  const pages = db().pages;
  return pages;
};
const Pages = () => {
  const fetcher = useFetcher();
  const pages = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const onDelete = (id: string) => {
    if (!id) return;
    fetcher.submit(
      {
        id,
      },
      {
        action: "/api/delete",
        method: "POST",
      }
    );
  };
  const rows = pages.map((page) => (
    <Table.Tr key={page.title}>
      <Table.Td>{page.title}</Table.Td>
      <Table.Td w={64}>
        <div className="flex gap-2">
          <ThemeIcon className="cursor-pointer" onClick={() => navigate(`/pages/${page.id}`)}>
            <LuPencilLine fontSize={16} />
          </ThemeIcon>
          <ThemeIcon variant="outline" color="red.6" className="cursor-pointer" onClick={() => onDelete(`${page?.id}`)}>
            <VscTrash fontSize={16} />
          </ThemeIcon>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="w-full h-full min-h-[100svh] items-center justify-center">
      <div className="w-full bg-slate-100 h-12 shadow flex items-center px-4">
        <Text className="font-semibold text-xl">Header Zone</Text>
      </div>
      <div className="flex gap-2 h-full">
        <div className="h-[calc(100svh-48px)] w-52 bg-slate-200 p-4">
          <Text className="text-lg">Sidebar Zone</Text>
        </div>
        <Container size="lg" className="flex flex-col h-full w-full p-4">
          <Text className="text-base">Home {">"} Blog Management</Text>
          <div className="w-full h-full overflow-hidden p-2 m-2">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>
                    <Center>
                      <ThemeIcon className="cursor-pointer" onClick={() => navigate(`/pages/create`)}>
                        <MdOutlinePlaylistAdd fontSize={20} />
                      </ThemeIcon>
                    </Center>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Pages;
