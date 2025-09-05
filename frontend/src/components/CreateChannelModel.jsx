import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useChatContext } from "stream-chat-react";
// import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { AlertCircleIcon, HashIcon, LockIcon, UsersIcon, XIcon } from "lucide-react";

const CreateChannelModal = ({isopen,onclose }) => {
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

//reset the form on open
    useEffect(() => {
        setChannelName("");
        setDescription("");
        setChannelType("public");
        setError("");
        setSelectedMembers([]);
           
    },[] )

    useEffect(() => {
        if (channelType === "public") setSelectedMembers(users.map((u) => u.id));
        else setSelectedMembers([]);
    },[channelType, users]);

  const validateChannelName = (name) => {
    if (!name.trim()) return "Channel name is required";
    if (name.length < 3) return "Channel name must be at least 3 characters";
    if (name.length > 22) return "Channel name must be less than 22 characters";

    return "";
  };
    const handleChannelNameChange =(e)=>{
        const value =e.target.value;
        setChannelName(value);
        setError(validateChannelName(value));
    };
    const handlesubmit=async (e)=>{
        e.preventdefault();
        const validationError=validateChannelName(channelName);
        if(validationError){
            return setError(validationError);
        }
        if (isCreating || !client.user)
        {
            return;
        }
        setIsCreating(true)
        setError("")
        try{
            const channelId = channelName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")        
            .replace(/[^a-z0-9_-]/g, "") 

            .slice(0,20)


            const channelData ={
                name:channelName.trim(), 
                created_by_id:client.user.id,
                members:[client.user.id,...selectedMembers],
            };  
            if (description) channelData.description = description;

            if(channelType === "private")
            {
                channelData.private = true;
                channelData.visibility = "private";
            }
            else{
                channelData.visibility = "public";
                channelData.discoverable =true;
            }
            const channel = client.channel("messaging", channelId, channelData);
        await channel.watch();
        setActiveChannel(channel);
        setSearchParams({ channel: channelId });

        toast.success(`Channel #${channelName} created successfully`);
        onclose();
        }
        catch(error){  
            console.log("Error creating channel",error)
          }
          finally{
            setIsCreating(false);
          }
    };
    return(<div className="create-channel-modal-overlay">
        <div className="create-channel-modal">
            <div className="create-channel-modal__header">
                <h2>Create a channel</h2>
                <button onClick={onclose} className="create-channel-modal__close" >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>

            <form action={handleSubmit} className="create-channel-modal__form" >
                {
                    error && (
                        <div className="form-error">
                            <AlertCircleIcon className="w-4 h-4 "/>
                            <span>{error}</span>
                        </div>
                    )
                }

                <div className="form-group">
                    <label htmlFor="channel-name">Channel Name</label>
                    <div className="input-icon-wrapper">
                    <HashIcon className="input-icon" />
                    <input type="text" 
                        id="channel-name" 
                        value={channelName} 
                        onChange={handleChannelNameChange} 
                        placeholder="Enter channel name" 
                        className={`form-input ${error ? "input-error" : ""}`}
                        autoFocus
                        maxLength={22} 
                    />
                    </div>
                   
                    {channelName && (
                        <div className="form-hint">
                            {
                                channelName
                                .toLowerCase()
                                .replace(/\s+/g, "-")        
                                .replace(/[^a-z0-9_-]/g, "") 
                            }
                            </div>
                    )}
                </div>
                <div className="form-group">
                    <label> Channel Type</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                value="private"
                                checked={channelType === "public"}
                                onChange={() => setChannelType(e.target.value)}
                            />
                            <div className="radio-content">
                                <HashIcon className="w-5 h-5" />
                                <div>
                                    <div className="radio-title">Public</div>
                                    <div className="radio-description">Anyone can join this channel</div>
                                </div>
                    </div>
                    </label>
                    </div>
                    </div>
                </form>
        </div>  
        </div>
)}
export default CreateChannelModal;