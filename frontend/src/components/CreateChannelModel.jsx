import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useChatContext } from "stream-chat-react";
// import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { AlertCircleIcon, HashIcon, LockIcon, UsersIcon, XIcon } from "lucide-react";

const CreateChannelModal = ({ onClose }) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("public");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [_, setSearchParams] = useSearchParams();


 const { client, setActiveChannel } = useChatContext();

//fetch user for member section
useState(()=>{

    const fetchuser=async ()=>{
        if(!client.user) return;
        setLoadingUsers(true);

        try{
            const response=await client.queryUsers({id:{$ne:client.user.id}},
                {name:1},
                {limit:100},

            )
            setUsers(response.users || [])
        }
        catch(error){
            console.log("Error fetching users")
            setUsers([])
        }
        finally{
            setLoadingUsers(false)
        }
    }
        fetchuser()
},[client])

  const validateChannelName = (name) => {
    if (!name.trim()) return "Channel name is required";
    if (name.length < 3) return "Channel name must be at least 3 characters";
    if (name.length > 22) return "Channel name must be less than 22 characters";

    return "";
  };

    return(<div>
            CreateChannelModel
        </div>)
}
export default CreateChannelModal;