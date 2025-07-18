import UploadModel from "../Models/UploadModel.js";

// POST /api/posts/analytics/:id
export const updateAnalytics = async (req, res) => {
  const { watchTime } = req.body;
  const userId =  req.user.userId // Get user ID from authentication middleware
  
  // console.log("Watch time:", watchTime, "User ID:", userId);

  try {
    const post = await UploadModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Initialize viewedBy array if it doesn't exist
    if (!post.viewedBy) {
      post.viewedBy = [];
    }

    // Check if this user has already viewed this post
    const hasViewed = post.viewedBy.some(
      (viewerId) => viewerId.toString() === userId?.toString()
    );

    // Only increment view count if user hasn't viewed before
    if (!hasViewed && userId) {
      post.views += 1;
      post.viewedBy.push(userId);
    }

    // Always update watch time (accumulative)
    post.watchTime += watchTime || 0;

    await post.save();
    
    res.status(200).json({ 
      message: "Analytics updated successfully",
      isNewView: !hasViewed,
      totalViews: post.views,
      totalWatchTime: post.watchTime
    });
  } catch (error) {
    console.error("Analytics update error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};