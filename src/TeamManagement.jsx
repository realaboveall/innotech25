import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, UserPlus, Loader2, Send } from 'lucide-react';
import { getTokenFromCookie } from './auth';


const InputField = ({ label, name, value, onChange, placeholder, type = 'text', required = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-cyan-300 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-black/30 border border-white/20 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            required={required}
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, children, disabled = false, required = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-cyan-300 mb-1">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-black/30 border border-white/20 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            required={required}
        >
            {children}
        </select>
    </div>
);


const CategorySpecificFields = ({ category, fields, setFields }) => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [problemStatements, setProblemStatements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = getTokenFromCookie() || localStorage.getItem('authToken');
                const res = await fetch('https://api.innotech.yaytech.in/api/categories', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Failed to fetch categories.');
                const data = await res.json();
                if (data.success) {
                    setCategoriesData(data.data);
                } else {
                    throw new Error(data.message || 'Could not load category data.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (category === 'college' || category === 'school') {
            fetchCategories();
        } else {
            setLoading(false);
        }
    }, [category]);
    
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setFields(prev => ({
            ...prev,
            categoryId: categoryId,
            problemStatementId: ''
        }));

        const selectedCategory = categoriesData.find(cat => cat.id === parseInt(categoryId));
        setProblemStatements(selectedCategory ? selectedCategory.problemStatements : []);
    };
    
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <p className="text-gray-400 sm:col-span-2">Loading category options...</p>;
    if (error) return <p className="text-red-400 sm:col-span-2">Error: {error}</p>;

    switch (category) {
        case 'college':
        case 'school':
            return (
                <>
                    {category === 'school' && (
                         <InputField label="School Student ID" name="schoolStudentId" value={fields.schoolStudentId || ''} onChange={handleFieldChange} placeholder="e.g., 1" />
                    )}
                    <SelectField label="Select Category" name="categoryId" value={fields.categoryId || ''} onChange={handleCategoryChange}>
                        <option value="">-- Choose a Category --</option>
                        {categoriesData.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </SelectField>

                    <SelectField 
                        label="Select Problem Statement" 
                        name="problemStatementId" 
                        value={fields.problemStatementId || ''} 
                        onChange={handleFieldChange}
                        disabled={!fields.categoryId || problemStatements.length === 0}
                    >
                        <option value="">-- Choose a Problem Statement --</option>
                        {problemStatements.length > 0 ? (
                            problemStatements.map(ps => (
                                <option key={ps.id} value={ps.id}>{ps.title}</option>
                            ))
                        ) : (
                           fields.categoryId && <option value="" disabled>No problem statements for this category</option>
                        )}
                    </SelectField>
                    
                    {(category === 'college' || category === 'school') && (
                        <>
                             <InputField label="Innovation Idea Name " name="inovationIdeaName" value={fields.inovationIdeaName || ''} onChange={handleFieldChange} placeholder="Your innovative idea" required={false}/>
                             <InputField label="Innovation Idea Description" name="inovationIdeaDesc" value={fields.inovationIdeaDesc || ''} onChange={handleFieldChange} placeholder="Describe your idea" required={false}/>
                        </>
                    )}
                </>
            );
        case 'startup':
            // return <InputField label="Startup ID" name="startupId" value={fields.startupId || ''} onChange={handleFieldChange} placeholder="e.g., 1" />;
        case 'researcher':
            return (
                <>
                    <InputField label="Innovation Idea Name" name="inovationIdeaName" value={fields.inovationIdeaName || ''} onChange={handleFieldChange} placeholder="Your research idea" required={false}/>
                    <InputField label="Innovation Idea Description" name="inovationIdeaDesc" value={fields.inovationIdeaDesc || ''} onChange={handleFieldChange} placeholder="Describe your research" required={false}/>
                </>
            );
        default:
            return <p className="text-gray-400">No specific fields required for your category.</p>;
    }
};


// --- Main Team Management Component ---
function TeamManagement({ userProfile }) {
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState([]);
    const [memberSearchQuery, setMemberSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [categoryFields, setCategoryFields] = useState({});
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSearchMember = async () => {
        if (!memberSearchQuery.trim()) return;
        setSearchLoading(true);
        setSearchError('');
        setSearchResult(null);
        try {
            const token = getTokenFromCookie() || localStorage.getItem('authToken');
            
            
            const category = userProfile.participationCategory;
            const res = await fetch(`https://api.innotech.yaytech.in/api/search/users?query=${memberSearchQuery}&participationCategory=${category}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Failed to search for user.');
            const data = await res.json();

            if (data.success && data.data.length > 0) {
                if (data.data[0].id === userProfile.id) {
                     setSearchError("You cannot add yourself to the team.");
                } else if (members.some(m => m.id === data.data[0].id)) {
                    setSearchError("This user is already in your team.");
                } else {
                    setSearchResult(data.data[0]);
                }
            } else {
                setSearchError('User not found.');
            }
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleAddMember = (member) => {
        if (members.length < 4) {
            setMembers([...members, member]);
            setSearchResult(null);
            setMemberSearchQuery('');
            setSearchError('');
        } else {
            setSearchError("You can add a maximum of 4 members.");
        }
    };
    
    const handleRemoveMember = (memberId) => {
        setMembers(members.filter(m => m.id !== memberId));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        const payload = {
            teamName,
            memberUserIds: members.map(m => m.id),
            department: userProfile.profileDetails?.branch || 'Other', 
        };
        
        switch(userProfile.participationCategory) {
            case 'college':
                Object.assign(payload, {
                    categoryId: parseInt(categoryFields.categoryId),
                    problemStatementId: parseInt(categoryFields.problemStatementId),
                    ...(categoryFields.inovationIdeaName && { inovationIdeaName: categoryFields.inovationIdeaName }),
                    ...(categoryFields.inovationIdeaDesc && { inovationIdeaDesc: categoryFields.inovationIdeaDesc }),
                });
                break;
            case 'startup':
                 Object.assign(payload, { startupId: parseInt(userProfile.profileDetails.id) });
                 break;
            case 'school':
                 Object.assign(payload, {
                    schoolStudentId: parseInt(categoryFields.schoolStudentId),
                    categoryId: parseInt(categoryFields.categoryId),
                    problemStatementId: parseInt(categoryFields.problemStatementId),
                    startupId: parseInt(userProfile.profileDetails.id),
                    ...(categoryFields.inovationIdeaName && { inovationIdeaName: categoryFields.inovationIdeaName }),
                    ...(categoryFields.inovationIdeaDesc && { inovationIdeaDesc: categoryFields.inovationIdeaDesc }),
                 });
                 break;
            case 'researcher':
                Object.assign(payload, {
                    researchId: parseInt(userProfile.profileDetails.id),
                    ...(categoryFields.inovationIdeaName && { inovationIdeaName: categoryFields.inovationIdeaName }),
                    ...(categoryFields.inovationIdeaDesc && { inovationIdeaDesc: categoryFields.inovationIdeaDesc }),
                });
                break;
            default:
                break;
        }

        console.log('Final Payload to be sent:', JSON.stringify(payload, null, 2));

        try {
            const res = await fetch('https://api.innotech.yaytech.in/api/team/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getTokenFromCookie() || localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create team.');
            }
            
            const result = await res.json();
            if (result.success) {
                alert('Team created successfully!');
            } else {
                 throw new Error(result.message || 'An unknown error occurred.');
            }

        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-white/10 mt-8 rounded-2xl p-6"
        >
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Create Your Team</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField label="Team Name" name="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g., The Innovators" />
                <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Add Team Members (1-4 members)</label>
                    <div className="flex items-center gap-2">
                        <input type="text" value={memberSearchQuery} onChange={(e) => setMemberSearchQuery(e.target.value)} placeholder="Enter member's User ID to search" className="flex-grow bg-black/30 border border-white/20 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500"/>
                        <button type="button" onClick={handleSearchMember} disabled={searchLoading} className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 disabled:opacity-50 disabled:cursor-wait">
                            {searchLoading ? <Loader2 className="animate-spin w-5 h-5"/> : <Search className="w-5 h-5"/>}
                        </button>
                    </div>
                    {searchError && <p className="text-red-400 text-sm mt-2">{searchError}</p>}
                </div>
                {searchResult && (
                    <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src={searchResult.profileImage} alt={searchResult.name} className="w-10 h-10 rounded-full"/>
                            <div>
                                <p className="font-semibold text-white">{searchResult.name}</p>
                                <p className="text-sm text-gray-400">{searchResult.userId}</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => handleAddMember(searchResult)} className="flex items-center gap-2 px-3 py-1 bg-green-600 text-sm rounded-md hover:bg-green-500">
                           <UserPlus className="w-4 h-4" /> Add
                        </button>
                    </div>
                )}
                {members.length > 0 && (
                    <div>
                        <h4 className="text-md font-semibold text-gray-300 mb-2">Team Members:</h4>
                        <div className="space-y-2">
                            {members.map(member => (
                                <div key={member.id} className="p-2 bg-black/30 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={member.profileImage} alt={member.name} className="w-8 h-8 rounded-full"/>
                                        <p className="text-white">{member.name}</p>
                                    </div>
                                    <button type="button" onClick={() => handleRemoveMember(member.id)} className="text-red-400 hover:text-red-300">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {userProfile.participationCategory !== 'startup' ? <div className="border-t border-white/10 pt-4">
                     <h4 className="text-md font-semibold text-gray-300 mb-3">Category Specific Information</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CategorySpecificFields 
                            category={userProfile.participationCategory} 
                            fields={categoryFields}
                            setFields={setCategoryFields}
                        />
                     </div>
                </div> : "" }

                 {submitError && <p className="text-red-400 text-center">{submitError}</p>}
                 <button type="submit" disabled={isSubmitting} className="w-full font-semibold text-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
                    {isSubmitting ? 'Creating Team...' : 'Create Team'}
                 </button>
            </form>
        </motion.div>
    );
}

export default TeamManagement;