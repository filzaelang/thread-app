import { Heading, Spacer, Text, Button, Flex, Box, useBreakpointValue, Container } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../store/rootReducer";
import { useDispatch } from "react-redux";

// icons
import { RiHome7Line } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        dispatch(AUTH_LOGOUT());
        navigate("/login")
    }

    const sidebarHeight = useBreakpointValue({ base: "auto", lg: "90vh" });
    const location = useLocation();

    const isItemActive = (path: string) => {
        return location.pathname === path;
    };

    const navItemStyles = {
        fontWeight: "normal"
    };

    const activeItemStyles = {
        fontWeight: "bolder",
    };

    return (
        <Container>
            <Flex as={"nav"} color={"white"} flexDirection={{ base: "row", md: "row", lg: "column", xl: "column" }} justify={"space-between"} gap={4} minHeight={sidebarHeight}
            >
                <Heading as={"h1"} color={"#04a51e"} fontWeight={"Bold"} fontSize={"60px"} display={{ base: "none", md: "none", lg: "block", xl: "block" }}>
                    circle
                </Heading>
                {/* ListItem Home */}
                <NavLink to="/" style={isItemActive("/") ? activeItemStyles : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3}>
                        <RiHome7Line fontSize={"25px"} style={isItemActive("/") ? activeItemStyles : navItemStyles} />
                        <Text fontSize="md" display={{ base: "none", md: "none", lg: "block", xl: "block" }}>Home</Text>
                    </Flex>
                </NavLink>

                {/* ListItem Search */}
                <NavLink to="/search" style={isItemActive("/search") ? { fontWeight: "bold" } : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3}>
                        <MdOutlinePersonSearch fontSize={"25px"} style={isItemActive("/search") ? activeItemStyles : navItemStyles} />
                        <Text fontSize="md" display={{ base: "none", md: "none", lg: "block", xl: "block" }}>Search</Text>
                    </Flex>
                </NavLink>

                {/* ListItem Follows */}
                <NavLink to="/follows" style={isItemActive("/follows") ? { fontWeight: "bold" } : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3}>
                        <FaRegHeart fontSize={"25px"} style={isItemActive("/follows") ? activeItemStyles : navItemStyles} />
                        <Text fontSize="md" display={{ base: "none", md: "none", lg: "block", xl: "block" }}>Follows</Text>
                    </Flex>
                </NavLink>

                {/* ListItem Profile */}
                <NavLink to="/profile" style={isItemActive("/profile") ? { fontWeight: "bold" } : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3}>
                        <FaRegCircleUser fontSize={"25px"} style={isItemActive("/profile") ? activeItemStyles : navItemStyles} />
                        <Text fontSize="md" display={{ base: "none", md: "none", lg: "block", xl: "block" }}>Profile</Text>
                    </Flex>
                </NavLink>

                {/* ListItem Create Post */}
                <NavLink to="/create-post" style={isItemActive("/create-post") ? { fontWeight: "bold" } : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3} display={{ base: "block", md: "block", lg: "none", xl: "none" }}>
                        <FaPlus
                            fontSize={"25px"} fontWeight={"bold"}
                            style={isItemActive("/create-post") ? activeItemStyles : navItemStyles}
                        />
                    </Flex>
                </NavLink>

                <Box display={{ base: "none", md: "none", lg: "block", xl: "block" }}>
                    <NavLink to="/create-post">
                        <Button
                            colorScheme="orange"
                            padding="20px"
                            width="100%"
                            backgroundColor="#04a51e"
                            borderRadius={100}
                            position={"relative"}
                        >
                            Create Post
                        </Button>
                    </NavLink>
                </Box>
                <Spacer display={{ base: "none", md: "none", lg: "block", xl: "block" }} />

                {/* ListItem Logout */}
                <NavLink to="/login" onClick={handleLogout} style={isItemActive("/logout") ? { fontWeight: "bold" } : navItemStyles}>
                    <Flex flexDirection={"row"} gap={3}>
                        <TbLogout2 fontSize={"25px"} style={isItemActive("/logout") ? activeItemStyles : navItemStyles} />
                        <Text fontSize="md" display={{ base: "none", md: "none", lg: "block", xl: "block" }}>Logout</Text>
                    </Flex>
                </NavLink>
            </Flex >
        </Container>
    );
}

export default Navbar;
