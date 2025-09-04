import { useNavigate } from "react-router";
import { useConversations } from "@/hooks/conversations";
import Menu from "@/component/menu";

export default function Sidebar() {
  const navigate = useNavigate();
  const { list: conversations, addConversation } = useConversations();

  const handleNewRoom = () => {
    const item = addConversation("New chat");
    navigate(`/conversation/${item.id}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section -gap">
        <button
          type="button"
          onClick={handleNewRoom}
          className="button -primary -wide -icon"
        >
          <i className="fa fa-plus" />
          New chat
        </button>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Conversations</h4>

        {conversations.length ? (
          <Menu.List>
            {conversations.map((item) => {
              return (
                <Menu.Item key={item.id} to={`/conversation/${item.id}`}>
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu.List>
        ) : (
          <p className="empty">...</p>
        )}
      </div>
    </div>
  );
}
